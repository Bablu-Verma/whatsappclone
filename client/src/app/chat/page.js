'use client'

import React from 'react'
import styles from "./page.module.css"
import { ChatLeftComponents } from '@/components/leftchannel/ChatLeftComponents'
import { ChatRightComponents } from '@/components/ChatRightComponents'

const Chat = () => {
  return (
    <div className={styles.chat_page}>
      <div className={styles.chat_container}>
        <ChatLeftComponents />
        <ChatRightComponents />
      </div>
    </div>
  )
}

export default Chat