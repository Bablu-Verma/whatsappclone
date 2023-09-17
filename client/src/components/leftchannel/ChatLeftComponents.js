import React from 'react'
import styles from './chatLeft.module.css'
import  ChatLeftHeader  from './ChatLeftHeader'
import ChatLeftChannel from './ChatLeftChannel'


export const ChatLeftComponents = () => {
  return (
    <div className={styles.left_components}>
         <ChatLeftHeader />
         <ChatLeftChannel />
    </div>
  )
}
