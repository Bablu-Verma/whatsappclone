import React from 'react'
import styles from './chatRight.module.css'
import Image from 'next/image'
import Link from 'next/link'
import RightChatHeader from './rightchat/RightChatHeader'
import ChatContainer from './rightchat/ChatContainer'
import RightChatFooter from './rightchat/RightChatFooter'

export const ChatRightComponents = () => {
  return (
    <div className={styles.right_components}>
      {/* <div className={styles.start_tamplate}>
        <Image  src='/welcome.webp' width={400} height={500} alt="Welcome Image"/> 
        <p><Link href="/">How to use</Link></p>
      </div> */}
      <RightChatHeader />
      <ChatContainer />
      <RightChatFooter />

    </div>
  )
}
