import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NotificationsList from '../features/timeline/NotificationsList'
import PostModal from '../features/postmodal/PostModal'
import Header from '../sections/header'

import { Provider } from 'react-redux'
import store from '../store'

const NotificationsWrapper = () =>
    <Provider store={store}>
        <Notifications />
    </Provider>

const Notifications = () => {
  return (
        <div className={styles.container} id='root'>
            <Head>
                <title>Astod - Notifications</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <NotificationsList />
                <PostModal />
            </main>
        </div>
    )
}

export default NotificationsWrapper
