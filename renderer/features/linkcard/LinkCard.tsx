import styles from './Linkcard.module.css'

export default function LinkCard(props: any): React.JSX.Element {
  const {card} = props

  if (!card) return <></>;

  return (
    <div className={styles.card}>
      <a className={styles.cardLink} href={card.url} target='_blank'>
        <div className={styles.previewImage}>
          <img className={styles.image} src={card.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{card.title}</h3>
          <p className={styles.description}>{card.description}</p>
        </div>
      </a>
    </div>
  )
}
