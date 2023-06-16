import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Timeline from '../features/timeline/Timeline'
import { Provider } from 'react-redux'
import store from '../store'
import Header from '../sections/header'

const HomeWrapper = (): React.JSX.Element =>
    <Provider store={store}>
        <Home />
    </Provider>

const Home = (): React.JSX.Element => 
    <div className={styles.container} id='root'>
        <Head>
            <title>Astod - Timeline</title>
        </Head>
        <Header />
        <main className={styles.main}>
            <Timeline />
        </main>
    </div>

export default HomeWrapper
