import styles from './PostModal.module.css'
import { useAppSelector, useAppDispatch } from '../../../renderer/hooks'
import { postMessageAsync } from '../../../main/slices/timelineSlice';
import React from 'react';
import Modal from 'react-modal';
import { TbX } from "react-icons/tb";
import { isModalOpen, closePostModal, getInReplyTo } from '../../../main/slices/postModalSlice';
import { FileUploader } from "react-drag-drop-files";

export default function PostModal() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const dispatch = useAppDispatch()
  const [statusMessage, setStatusMessage] = React.useState('')
  const [mediaFile, setMediaFile] = React.useState({})

  const modalIsOpen: boolean = useAppSelector(isModalOpen)
  const inReplyTo: string | undefined = useAppSelector(getInReplyTo)
  
  function closeModal() {
    setStatusMessage(``)
    dispatch(closePostModal())
  }

  function submitModal() {
    dispatch(postMessageAsync({
      status: statusMessage, 
      replyID: inReplyTo,
      mediaFile: mediaFile
    }))

    setMediaFile({})
    closeModal()
  }

  const getHeaderText = (inReplyTo: string | undefined) => {
    return inReplyTo ? `Reply Toot` : `New Toot`
  }

  const handleChange = (file) => {
    setMediaFile(file)
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.modal} overlayClassName={styles.overlay} contentLabel="Post new message" ariaHideApp={false}>
      <TbX className={styles.closeIcon} cursor='pointer' onClick={closeModal} size={20} title='Close' />
      <h2>{getHeaderText(inReplyTo)}</h2>
      <form>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        <textarea
          className={styles.textbox}
          aria-label="Post new message"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
          rows={10}
          cols={75}
        />
        <div className={styles.actionRow}>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={submitModal}>Toot</button>
        </div>
      </form>
    </Modal>
  )
}
