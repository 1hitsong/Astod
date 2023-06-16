import { useEffect } from 'react'
import { useAppSelector, useAppDispatch, useInterval } from '../../../renderer/hooks'
import {
    loadTimelineData,
    getTimelineData
} from '../../../main/slices/timelineSlice'
import styles from './Timeline.module.css'
import Avatar from '../avatar/Avatar'
import MediaAttachments from '../mediaattachments/MediaAttachments'
import EngagementCounts from '../engagementcounts/EngagementCounts'
import LinkCard from '../linkcard/LinkCard'
import Link from 'next/link'
import { formatedTimestamp } from '../../../main/helpers/dateTime'
import type TimelineContent from '../../../main/types/TimelineContent'

const rowClasses = (isReblog: boolean): string => {
    const rowClassNames: string[] = [styles.row]
    if (isReblog) rowClassNames.push(styles.reblog)
    return rowClassNames.join(` `)
}

const renderTimelineRow = (item: TimelineContent): JSX.Element => {
    const timeLineItem = item.reblog ? item.reblog : item
    const timeStamp: string = formatedTimestamp(timeLineItem.created_at)
    const rowClassName: string = rowClasses(item.reblog !== null)

    return (
        <div key={timeLineItem.id} className={rowClassName}>
            <Avatar account={timeLineItem.account} />
            <div>
                <h3 className={styles.author}>{timeLineItem.account.display_name}
                    <span className={styles.timestamp}>
                        <Link href={{ pathname: '/replies', query: { id: timeLineItem.id } }}>{timeStamp}</Link>
                    </span>
                </h3>

                <div dangerouslySetInnerHTML={{ __html: timeLineItem.content }} />

                {timeLineItem.emojis.map( emoji => (
                    <img src={emoji.static_url} width={32} alt={emoji.shortcode} title={emoji.shortcode} />
                ))}

                <MediaAttachments mediaAttachments={timeLineItem.media_attachments} />
        
                <LinkCard card={timeLineItem.card} />
        
                <EngagementCounts id={timeLineItem.id} favourites_count={timeLineItem.favourites_count} reblogs_count={timeLineItem.reblogs_count} replies_count={timeLineItem.replies_count} />
            </div>
        </div>
    )
}

const Timeline = (): React.JSX.Element => {
    const dispatch = useAppDispatch()
    const timelineData: TimelineContent[] = useAppSelector(getTimelineData)

    // Refresh the timeline every 20 seconds
    useInterval(() => {
        dispatch(loadTimelineData())
    }, 20000)

    // Perform first data load as soon as the page is ready
    useEffect(() => {
        dispatch(loadTimelineData())
    }, [])

    return (
        <div>
            {timelineData.length && timelineData.map( (item: TimelineContent) => (
                renderTimelineRow(item)
            ))}
        </div>
    )
}

export default Timeline
