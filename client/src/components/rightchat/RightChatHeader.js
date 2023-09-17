import React, { useState } from 'react'
import styles from './rightchat.module.css'
import Image from 'next/image'

import { BiDotsVertical } from 'react-icons/bi';
import Link from 'next/link';

const RightChatHeader = () => {
    const [userMenu, setUserMenu] = useState(false)

    const toggleusermenu = ()=>{
        setUserMenu(!userMenu)
    }


  return (
    <div className='chat_header'>
        <div className={styles.chat_header}>
           <div className={styles.header_profile}>
            <Image src='/user-profile.png' alt='user Profile' height={45} width={45} />
           </div>
           <div className={styles.header_name_sec}>
            <h3>bablu Verma</h3>
            <span>Online</span>
           </div>
           <div className={styles.header_user_menu_icon}>
            <span title='Menu' onClick={toggleusermenu} >
                <BiDotsVertical />
            </span>
            {
               userMenu ? <div className={styles.header_user_menu}>
                 <p><Link href='/user-detail' >Profile</Link></p>
                 <p style={{paddingTop:'4px'}}>Clear Chat</p>
                </div> :''
            }
           </div>
        </div>
    </div>
  )
}

export default RightChatHeader