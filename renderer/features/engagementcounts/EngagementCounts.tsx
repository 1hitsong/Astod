import styles from './EngagementCounts.module.css'
import { TbHeartFilled, TbRepeat, TbMessages } from "react-icons/tb";
import { useAppDispatch } from '../../../renderer/hooks'
import {
  openPostModal
} from '../../../main/slices/postModalSlice'
import {
  boostMessageAsync
} from '../../../main/slices/timelineSlice'
import Link from 'next/link'

export default function EngagementCounts(props: any) { 
  const dispatch = useAppDispatch()

  const onFavoriteClicked = () => {
    alert(`Favorite Clicked`);
  }
  const onReblogClicked = () => {
    dispatch(boostMessageAsync(props.id))
  }
  const onReplyClicked = () => {
    dispatch(openPostModal(props.id))
  }
  const onReplyCountClicked = () => {
    dispatch(openPostModal(props.id))
  }

  return (
    <div className={styles.engagementCounts}>
      <span className={styles.engageItem} onClick={onFavoriteClicked} title='Favorite'><span className={styles.icon}><TbHeartFilled /></span> {props.favourites_count}</span>
      <span className={styles.engageItem} onClick={onReblogClicked} title='Reblog'><span className={styles.icon}><TbRepeat /></span> {props.reblogs_count}</span>
      <span className={styles.engageItem} title='Reply'>
        <span className={styles.icon} onClick={onReplyClicked}><TbMessages /></span>
        <Link
          href={{
            pathname: '/replies',
            query: { id: props.id },
          }}
        >{props.replies_count}</Link>
      </span>
    </div>
  )
}
