import styles from './MediaAttachments.module.css'
import { useState } from 'react'


export default function MediaAttachments(props: any) { 
  if (!props.mediaAttachments.length) return null

  const [dialogOpen, setdialogOpen] = useState(false)

  const [dialogURL, setdialogURL] = useState(``)
  const [dialogType, setdialogType] = useState(``)

  const handleShowDialog = () => {
    setdialogOpen(false)
  };

  function showDialog(e: any) {
    setdialogURL(e.dataset.fullUrl)
    setdialogType(e.dataset.type)
    setdialogOpen(true)
  };

  return (
    <>
    <div className={styles.mediaAttachmentsRow}>
      {props.mediaAttachments.map( (attachment: any) => <img className={styles.attachmentImage} onClick={(e) => {showDialog(e.target)}} data-type={attachment.type} data-full-url={attachment.url} src={attachment.preview_url} />)}
    </div>

    {dialogOpen && (
        <dialog className={styles.dialog} onClick={handleShowDialog} open>
          {dialogType === `image` ? (
            <img alt="no image" className={styles.zoomImage} onClick={handleShowDialog} src={dialogURL} />
          ) :
          <video onClick={handleShowDialog} loop autoPlay><source src={dialogURL} type="video/mp4" /></video>
          }
        </dialog>
      )}
    </>
  )
}
