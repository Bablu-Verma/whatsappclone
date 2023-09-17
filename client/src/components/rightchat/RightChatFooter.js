import React, { useState } from 'react';
import styles from './rightchat.module.css';
import Picker from 'emoji-picker-react';
import { AiOutlinePaperClip, AiOutlineSend } from 'react-icons/ai';
import toast from 'react-hot-toast';

const RightChatFooter = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState('');
  const [fileStr, setFileStr] = useState('');

  const handelMessageClick = () => {
    if(fileStr || inputStr){
      console.log(inputStr , fileStr);
      setInputStr('')
      setFileStr('')
    }else{
      toast.error("Type message or Add file")
    }
  };
  const messageHandler = (e) => {
    setInputStr(e.target.value);
  };
  const onEmojiClick = (event) => {
    setInputStr((prevInput) => prevInput + event.emoji);
  };

  const checkEnterPress = (e) => {
    if (e.which === 13) {
      handelMessageClick();
    }
  }
  const  fileHandleFun = (e) =>{
    setFileStr(e.target.files[0])
  }
 



  
  return (
    <div className={styles.rightchatfooter}>
      <div className={styles.footer_style}>
        <div className={styles.emoji_section}>
          <span onClick={() => setShowPicker((val) => !val)} title="Click to Add Emoji">
            😃
          </span>
          {showPicker && (
            <div className={styles.emoji_section_position}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className={styles.document_upload_section}>
          <label title="Upload image & More" htmlFor="upload">
            <AiOutlinePaperClip />
          </label>
          <input onChange={fileHandleFun} style={{ display: 'none' }} type="file" id="upload" />
        </div>
        <div className={styles.message_text_section}>
          <input
            type="text"
            onChange={messageHandler}
            onKeyUp={checkEnterPress}
            name="message"
            id="message"
            value={inputStr}
            autoCapitalize="none"
          />
          <button title="Click to send" type="button" onClick={handelMessageClick}>
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightChatFooter;
