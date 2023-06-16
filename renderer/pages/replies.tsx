import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import RepliesList from '../features/timeline/RepliesList'
import PostModal from '../features/postmodal/PostModal'
import Header from '../sections/header'

import { Provider } from 'react-redux'
import store from '../store'

const RepliesWrapper = () =>
    <Provider store={store}>
        <Replies />
    </Provider>


function Replies() {
    const parentID = useRouter()?.query?.id

    return (
        <div className={styles.container} id='root'>
            <Head>
                <title>Astod - Replies</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <RepliesList parentID={parentID} />
                <PostModal />
            </main>
        </div>
    )
}

export default RepliesWrapper
