import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export function formatedTimestamp(timestamp: string): string {
    dayjs.extend(relativeTime)
    return dayjs(timestamp).fromNow()
  }