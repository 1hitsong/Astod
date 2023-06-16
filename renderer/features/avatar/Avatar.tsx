import styles from './Avatar.module.css'

export default function Avatar(props: any):React.JSX.Element {
  return (
    <img src={props.account.avatar} title={props.account.display_name} className={styles.avatar} />
  )
}
