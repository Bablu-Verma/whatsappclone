'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { login_url } from '@/service/api'

// welcome page style 

export default function Home() {

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  const router = useRouter()

  const onSubmit = async () => {
    //  console.log( userData.email, userData.password)
    if (!userData.email) {
      return toast.error("Enter Email")
    }

    if (!userData.password) {
      return toast.error("Enter Password")
    }

    try {
      const { data } = await axios.post(login_url, {
        email: userData.email,
        password: userData.password
      })
      //  console.log(data)
      if (data.status == 0) {
        toast.success(data.message)
        setUserData({
          email: "",
          password: "",
        })
      }
      if (data.status == 1) {
        toast.success(data.message)
        setUserData({
          email: "",
          password: ""
        })
        console.log(data.token)
        localStorage.setItem("login_chatme_token", data.token);
        setTimeout(() => {
          // router.push('/chat')
        }, 1200)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  return (
    <section>
      <nav className={styles.nav}>
        <div style={{ paddingTop: "20px" }}>
          <h4 className={styles.logo}>We Chat ❤️</h4>
        </div>
      </nav>
      <div className={styles.container}>
        <div className={styles.model_box}>
          <div className='top_heading'>
            <h1 className={styles.heading}><i>Chat Your Family & Friends in Your Browser</i></h1>
            <ol className={styles.ol}>
              <li><Link href="/register">Register</Link> your Details</li>
              <li>Login your Account Using User Name & Password</li>
              <li>Start Chating your Family & Friends</li>
              <li>Don't worry Your <span>data is Safe</span></li>
            </ol>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.login_section}>
            <div className={styles.login_box}>
              <h2 className={styles.login_heading}>Login Now</h2>
              <div className={styles.input_box}>
                <input type='text' onChange={inputHandler} value={userData.email} name="email" placeholder='Email ' />
                <input type='password' onChange={inputHandler} value={userData.password} name="password" placeholder='Password' />
              </div>
              <p className={styles.forgot_password}> <strong>Login with Google</strong>
                <Link href="/forgot-password-request">Forgot Password</Link></p>
              <button type='button' onClick={onSubmit} className={styles.login_button}>Login</button>
              <p className={styles.new_user}>I'm new user <Link href='/register'> Register </Link></p>
            </div>
            <div className={styles.login_image_box}>
              <Image src="/offline_messaging.gif" width={200} height={100} alt='Login image' />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
