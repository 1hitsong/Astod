import { useEffect } from 'react'
import { useAppSelector, useAppDispatch, useInterval } from '../../../renderer/hooks'
import {
  getNotificationList,
  selectCount
} from '../../../main/slices/notificationsSlice'
import styles from './Timeline.module.css'
import Avatar from '../avatar/Avatar'
import Link from 'next/link'
import { formatedTimestamp } from '../../../main/helpers/dateTime'
import type NotificationsContent from '../../../main/types/NotificationsContent'

const renderReplyRow = (item: NotificationsContent) => {
  const timeLineItem = item
  const rowClassName = [styles.row]

  const timeStamp = formatedTimestamp(timeLineItem.created_at)
 
  return (
    <div key={timeLineItem.id} className={rowClassName.join(` `)}>
            <div>{timeLineItem.type}</div>
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
        {timeLineItem?.status?.content &&
          <div dangerouslySetInnerHTML={{ __html: timeLineItem.status.content }} />
        }
      </div>
    </div>
  )
}

function NotificationsList(props: any) {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)

  console.log(`count`, count.notificationsContent)

  // Refresh the timeline every 10 seconds
  useInterval(() => {
    dispatch(getNotificationList())
  }, 30000)

  // Perform first data load
  useEffect(() => {
    dispatch(getNotificationList())
  }, [])

  return (
    <div>
        {count?.notificationsContent.length && count.notificationsContent.map( item => (
            renderReplyRow(item)
        ))}
    </div>
  )
}

export default NotificationsList
