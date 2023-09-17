"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";

// welcome page style

export default function ForgotPasswordRequest() {
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
              <h2 className={styles.login_heading}>Request Forgot Password</h2>
              <p className={styles.dont_worry}>Don't Worry Your account is Recover</p>
              <div className={styles.input_box}>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={userData.name}
                  name="name"
                  placeholder="Your register Email "
                />
                
              </div>
              <button
                type="button"
                onClick={onSubmit}
                className={styles.login_button}
              >
                Request Send
              </button>
            </div>
            <div className={styles.login_image_box}>
                <Image src="/req-change-pass.png" width={200} height={100} alt="change password" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
