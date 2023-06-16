import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAppSelector, useAppDispatch } from '../hooks'
import { postClientAppAsync, selectClientApp } from '../../main/slices/clientappSlice'
import { postAuthTokenAsync, selectClientAuth } from '../../main/slices/clientauthSlice'
import secureLocalStorage from "react-secure-storage"
import Header from '../sections/header'

import { shell } from "electron"

import { Provider } from 'react-redux'
import store from '../store'

const LoginWrapper = () =>
    <Provider store={store}>
        <Login />
    </Provider>

function Login() {
    const dispatch = useAppDispatch()
    const clientAppData = useAppSelector(selectClientApp)
    const clientAuthData = useAppSelector(selectClientAuth)

    if (clientAuthData.clientAuthContent.access_token.length) {
        secureLocalStorage.setItem("APIToken", clientAuthData.clientAuthContent.access_token)
    }

    function loginSubmit(e) {
        e.preventDefault()

        const instance = (document.querySelector('#instance') as HTMLInputElement).value
        const accessToken = (document.querySelector('#accessToken') as HTMLInputElement).value

        secureLocalStorage.setItem("instance", instance)

        if (accessToken !== ``) {
            secureLocalStorage.setItem("accessToken", accessToken)
            return
        }

        if (clientAppData.clientappContent.client_secret === ``) {
            dispatch(postClientAppAsync())
            return
        }

        const client_secret = secureLocalStorage.getItem("client_secret")

        if (client_secret) {
            dispatch(postAuthTokenAsync())
            return
        }
  
        secureLocalStorage.setItem("client_secret", clientAppData.clientappContent.client_secret)
        secureLocalStorage.setItem("client_id", clientAppData.clientappContent.client_id)

        let params:URLSearchParams = new URLSearchParams({ 
            response_type: `code`,
            client_id: clientAppData.clientappContent.client_id,
            redirect_uri: clientAppData.clientappContent.redirect_uri,
            scope: `read write push`
        })

        shell.openExternal(`${instance}/oauth/authorize?` + params.toString())
    }

    return (
        <div className={styles.container} id='root'>
            <Head>
                <title>Astod - Login</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <form onSubmit={loginSubmit}>
                    <label>Instance URL</label>
                    <input id='instance' />
                    <br />
                    <label>Access Token</label>
                    <input id='accessToken' />
                    <br />
                    <button>Login</button>
                </form>
            </main>
        </div>
    )
}

export default LoginWrapper
