"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";

// welcome page style

export default function UserDetail() {
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    console.log(userData.email, userData.password);
  };

  return (
    <section>
      <nav className={styles.nav}></nav>
      <div className={styles.container}>
        <div className={styles.model_box}>
          <div className={styles.register_section}>
            <div className={styles.login_box}>
              <h2 className={styles.login_heading}>Bablu Verma</h2>
              <strong>Email</strong>
              <p>jbablu@gmail.com</p>
              <strong>About</strong>
              <p>I am a developer</p>
            </div>
            <div className={styles.login_image_box}>
             <div >
             <Image
                src="/user-profile.png"
                alt="user Picture"
                width={150}
                height={150}
              />
             </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
