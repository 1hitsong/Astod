import type Account from './Account'

interface NotificationsContent {
    id: string
    type: string
    account: Account
    created_at: string
    status: {
        id: string
        content: string
    }
}

export default NotificationsContent