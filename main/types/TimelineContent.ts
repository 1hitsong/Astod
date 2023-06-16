import type Account from './Account'
import type MediaAttachment from './MediaAttachment'
import type Card from './Card'
import type Emoji from './Emoji'

interface TimelineContent {
    reblog: {
        id: string
        content: string
        favourites_count: number
        reblogs_count: number
        replies_count: number
        created_at: string
        uri: string
        account: Account
        media_attachments: MediaAttachment[]
        card: Card
        emojis: Emoji[]
    },
    id: string
    content: string
    favourites_count: number
    reblogs_count: number
    replies_count: number
    created_at: string
    uri: string
    account: Account
    media_attachments: MediaAttachment[]
    card: Card
    emojis: Emoji[]
}

export default TimelineContent