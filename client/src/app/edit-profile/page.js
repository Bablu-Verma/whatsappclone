"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";

// welcome page style

export default function EditProfile() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    repassword: "",
  });

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
              <h2 className={styles.login_heading}>Edit Your Details</h2>
             
              <div className={styles.input_box}>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={userData.name}
                  name="name"
                  placeholder="Your Name "
                />
                <input
                  type="text"
                  onChange={inputHandler}
                  value={userData.aboutyou}
                  name="name"
                  placeholder="About You"
                />
              </div>

              <button
                type="button"
                onClick={onSubmit}
                className={styles.login_button}
              >
                Submit
              </button>
              <p className={styles.change_password_text}><Link href='edit-profile/change-password' title="Request to change password">Change Password</Link></p>
            </div>
            
            <div className={styles.login_image_box}>
            <div className={styles.file_div}>
                <label title="Click to Change Profile" htmlFor="file"><Image src='/user-profile.png' alt='user Profile' height={150} width={150}/></label>
                <input
                  style={{display:'none'}}
                  type="file"
                  id="file"
                  onChange={inputHandler}
                  name="profile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
