"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";

// welcome page style

export default function EnterOTP() {
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
              <h2 className={styles.login_heading}>Enter OTP</h2>
              <p className={styles.dont_worry}>Check Your Register Email</p>
              <div className={styles.input_box}>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={userData.name}
                  name="name"
                  placeholder="Enter 6 digit OTP.. "
                />
              </div>
              <button
                type="button"
                onClick={onSubmit}
                className={styles.login_button}
              >
                Submit
              </button>
              <div className={styles.change_password_text}>
              <span> 00:01 </span>   <button type="button">Re-send OTP</button>
              </div>
            </div>
            <div className={styles.login_image_box}>
                <Image src="/otp.jpg" width={200} height={100} alt="change password" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
