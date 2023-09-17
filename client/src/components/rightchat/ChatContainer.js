import React, { useState } from 'react'
import styles from './rightchat.module.css'
import { AiFillDelete } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';


const ChatContainer = () => {
  const [deleteShown, setDeleteShown] = useState(false)

  const dubbelClickFun = () => {
    setDeleteShown(!deleteShown)
  }
 

  return (
    <div className={styles.chat_container}>
      <div className={styles.sender_message}>
        <div onDoubleClick={dubbelClickFun} title='Dubble click to delete message' className={styles.sender_message_inner}>
          {
            deleteShown && <>
            <span title='Delete message' className={styles.delete_button_style}><AiFillDelete /> </span> <span title='Click to close' onClick={dubbelClickFun} className={styles.cancle_delete_message}><RxCrossCircled /> </span>
            </>
          }
          
          <p>hi How Are You</p>
          <span className={styles.time_span}>10:10 am</span>
        </div>
      </div>
      <div className={styles.receiver_message}>
        <div className={styles.receiver_message_inner}>
          <p>hi How Are You</p>
          <span className={styles.time_span}>10:10 am</span>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer