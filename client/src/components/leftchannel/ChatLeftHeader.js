import React, { useState } from "react";
import styles from "./chatLeft.module.css";
import Image from "next/image";

import {
  BsChatLeftTextFill,
  BsArrowLeftShort,
  BsThreeDotsVertical,
  BsCircleSquare,
  BsSendFill,
} from "react-icons/bs";
import Link from "next/link";

const ChatLeftHeader = () => {
  const [menuShown, setMenuShown] = useState(false);
  const [chatShown, setChatShown] = useState(false);
  const [userShown, setUserShown] = useState(false);

  const toggleMenu = () => {
    setMenuShown(!menuShown);
  };

  const toggleChat = () => {
    setChatShown(!chatShown);
  };

  const toggleUser = () => {
    setUserShown(!userShown);
  };


 const userLogoutFun = (e)=>{
  e.stopPropagation()
 }


  const user_list = [
    {
      name: "Bablu",
      email: "bablu@gmail.com",
      id: 1,
      profile: "/user-profile.png",
    },
    {
      name: "rohan",
      email: "rohan@gmail.com",
      id: 2,
      profile: "/user-profile.png",
    },
  ];

  return (
    <div className={styles.header}>
      <div
        onClick={toggleUser}
        title="Profile"
        className={styles.user_profile_div}
      >
        <Image src="/user-profile.png" alt="" width={45} height={45} />
      </div>
      <div className={styles.icon_div_header}>
        <span title="Status">
          <BsCircleSquare />
        </span>
        <span onClick={toggleChat} title="New Chat">
          <BsChatLeftTextFill />
        </span>
        <span onClick={toggleMenu} title="Menu">
          <BsThreeDotsVertical />
          {menuShown ? (
            <div className={styles.menu_div_ab}>
              <ul>
                <li>
                  <Link href="/edit-profile">Edit Profile</Link>
                </li>
                <li>
                  <Link href="/">Help</Link>
                </li>
                <li>
                  <span onClick={(e)=> userLogoutFun(e)} >Logout</span>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </span>
      </div>

      {chatShown ? (
        <div className={styles.add_new_chat_div}>
          <div className={styles.add_new_chat_div_close_head}>
            <span onClick={toggleChat}>
              <BsArrowLeftShort />
            </span>{" "}
            <h4> New Chat</h4>
          </div>

          <div className={styles.chat_input_div}>
            <input type="text" placeholder="Enter Email" />
            <button>
              <BsSendFill />
            </button>
          </div>
          <ul className={styles.search_user_container}>
            {user_list.map((item, i) => {
              return (
                <li key={item.id}>
                  <Image src={item.profile} alt="" width={35} height={35} />
                  <div>
                    <h6>{item.name}</h6>
                    <span>{item.email}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      {userShown ? (
        <div className={styles.add_new_chat_div}>
          <div className={styles.add_new_chat_div_close_head}>
            <span onClick={toggleUser}>
              <BsArrowLeftShort />
            </span>{" "}
            <h4> User Profile</h4>
          </div>
          <div className={styles.user_profile_container}>
            <div className={styles.user_profile_image}>
              <label
                title="Change Profile"
                htmlFor="upload_profile"
                className={styles.user_profile_label}
              >
                <Image
                  src="/user-profile.png"
                  alt=""
                  width={150}
                  height={150}
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="upload_profile"
                />
              </label>
            </div>
            <ul>
              <li>
                <span>Name</span>
                <p>Bablu Verma</p>
              </li>
              <li>
                <span>Email</span>
                <p>bablu@gmail.com</p>
              </li>
              <li>
                <span>Date of Birth</span>
                <p>10-10-2002</p>
              </li>
              <li>
                <span>About</span>
                <p>I am a Designer & Developer</p>
              </li>
            </ul>
            <Link className={styles.edit_profile_text} href="/edit-profile">
              Edit Profile
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}

      {
        
      }
    </div>
  );
};

export default ChatLeftHeader;
