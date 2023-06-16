import React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { TbMessagePlus, TbLogin, TbMeteor, TbHome } from "react-icons/tb"
import { useAppDispatch } from '../hooks'
import { openPostModal } from '../../main/slices/postModalSlice'
import PostModal from '../features/postmodal/PostModal'

const Header = (): React.JSX.Element => {
    const dispatch = useAppDispatch()

    const onAddPostClicked = () => {
        dispatch(openPostModal())
    }

    return (
        <header className={styles.header}>
            <Link href={{ pathname: '/home' }}>
                <TbHome className={styles.homeIcon} cursor='pointer' size={25} title='Home' />
            </Link>

            <Link href={{ pathname: '/login' }}>
                <TbLogin className={styles.loginIcon} cursor='pointer' size={25} title='Login' />
            </Link>

            <Link href={{ pathname: '/notifications' }}>
                <TbMeteor className={styles.notificationIcon} cursor='pointer' size={25} title='Notifications' />
            </Link>

            <TbMessagePlus className={styles.messageIcon} cursor='pointer' onClick={onAddPostClicked} size={25} title='New Toot' />
            <PostModal />
        </header>
    )
}

export default Header
