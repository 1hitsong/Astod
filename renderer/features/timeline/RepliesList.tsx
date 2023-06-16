import { useEffect } from 'react'
import { useAppSelector, useAppDispatch, useInterval } from '../../../renderer/hooks'
import {
  getRepliesList,
  selectCount
} from '../../../main/slices/repliesSlice'
import styles from './Timeline.module.css'
import Avatar from '../avatar/Avatar'
import MediaAttachments from '../mediaattachments/MediaAttachments'
import EngagementCounts from '../engagementcounts/EngagementCounts'
import LinkCard from '../linkcard/LinkCard'
import Link from 'next/link'
import { formatedTimestamp } from '../../../main/helpers/dateTime'
import type RepliesContent from '../../../main/types/RepliesContent'


const renderReplyRow = (item: RepliesContent) => {
  const timeLineItem = item
  const rowClassName = [styles.row]

  const timeStamp = formatedTimestamp(timeLineItem.created_at)
 
  return (
    <div key={timeLineItem.id} className={rowClassName.join(` `)}>
      <Avatar account={timeLineItem.account} />
      <div>
        <h3 className={styles.author}>{timeLineItem.account.display_name}
          <span className={styles.timestamp}>
            <Link
              href={{
                pathname: '/replies',
                query: { id: timeLineItem.id },
              }}
            >{timeStamp}</Link>
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

function RepliesList(props: any) {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)

  const descendants = count.descendants;

  // Refresh the timeline every 10 seconds
  useInterval(() => {
    dispatch(getRepliesList(props.parentID))
  }, 10000)

  // Perform first data load
  useEffect(() => {
    dispatch(getRepliesList(props.parentID))
  }, [])

  return (
    <div>
        {descendants?.length && descendants.map( item => (
            renderReplyRow(item)
        ))}
    </div>
  )
}

export default RepliesList
