import React, { useState } from 'react'
import styles from './chatLeft.module.css'

import { FiSearch } from 'react-icons/fi';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

import Image from 'next/image';
import Link from 'next/link';

const user_list = [
  {
      name: 'Bablu',
      lastMsg:"hi bablu",
      id: 1,
      profile: '/user-profile.png'
  },
  {
      name: 'rohan',
      lastMsg:"hi bablu",
      id: 2,
      profile: '/user-profile.png'
  },
]

const ChatLeftChannel = () => {
  const [channelMenu, setChannelMenu] = useState(null)

  const toggelChannelMenu = (event,item)=>{
    event.stopPropagation();
    setChannelMenu(item.id)
    if(channelMenu){
      setChannelMenu(null)
    }
    console.log(item.id)
  }

  const click_channel  = (item)=>{
    console.log(item)
  }

  return (
    <div className={styles.channel_container}>
      <div className={styles.channel_input_div}>
        <input type='text' placeholder='Search or start new chat ..' autoCapitalize='none' name='search' />
        <button>
          <FiSearch />
        </button>
      </div>
      <ul className={styles.channel_list}>
        {
          user_list.map((item)=>{
            return(
              <li key={item.id} onClick={()=>click_channel(item)}>
                <Image  src={item.profile} width={40} height={40} alt={item.name}  />
                <div>
                 <h4>{item.name}</h4>
                 <span className={styles.last_message}>{item.lastMsg}</span>
                </div>
                <small> 10:10 am </small>
                <div className={styles.channel_menu}>
                   <span onClick={(e)=>toggelChannelMenu(e,item)} title='Menu'><PiDotsSixVerticalBold /></span>
                </div>
                {
                  channelMenu ==  item.id ?
                     <div className={styles.channel_abslout_menu}>
                      <span title='Delete Your conversion'>Delete User</span>
                      <span><Link href='/user-detail'>View Profile</Link></span>
                     </div>:''
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ChatLeftChannel