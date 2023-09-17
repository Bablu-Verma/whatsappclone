'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { useState } from 'react'

// welcome page style 

export default function Register() {
  const [userData, setUserData] = useState({
    email:"",
    password:"",
    name:"",
    repassword:""
  })

  const inputHandler = (e)=>{
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }


const onSubmit = ()=>{
   console.log( userData.email, userData.password)


 }
  
  return (
   <section>
      <nav className={styles.nav}>
      </nav>
      <div className={styles.container}>
        <div className={styles.model_box}>
         <div className={styles.register_section}>
            <div className={styles.login_box}>
            <h2 className={styles.login_heading}>Register Your Details</h2>
              <div className={styles.input_box}>
                <input type='text' onChange={inputHandler} value={userData.name} name="name" placeholder='Your Name ' />
                <input type='text' onChange={inputHandler} value={userData.email} name="email" placeholder='Email ' />
                <input type='password' onChange={inputHandler} value={userData.password} name="password"  placeholder='Password' />
                <input type='password' onChange={inputHandler} value={userData.repassword} name="repassword"  placeholder='Re-enter Password' />
                <div className={styles.file_div}>
                <label htmlFor="file">Profile Picture</label>
                <input type='file' id='file' onChange={inputHandler}  name='profile'  />
                </div>
                <textarea type='text' onChange={inputHandler} value={userData.email} name="email" placeholder='About You ' />
               
              </div>
              <p className={styles.forgot_password}>
              <strong>Register with Google</strong>
              </p>
              <button type='button' onClick={onSubmit}  className={styles.login_button}>Register</button>
              <p className={styles.new_user}>I have a account <Link href='/'> Login </Link></p>
            </div>
            <div className={styles.login_image_box}>
              <Image src="/register.png" width={200} height={100} alt='Login image' />
            </div>
         </div>
        </div>
      </div>
   </section>
  )
}
