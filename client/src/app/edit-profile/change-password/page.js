"use client";

import Image from "next/image";
import styles from "../page.module.css";
import { useState } from "react";
import Link from "next/link";

// welcome page style

export default function ChangePassword() {
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
              <h2 className={styles.login_heading}>Change Your Password</h2>
              <div className={styles.input_box}>
                <input
                  type="password"
                  onChange={inputHandler}
                  value={userData.name}
                  name="name"
                  placeholder="New Password "
                />
                <input
                  type="password"
                  onChange={inputHandler}
                  value={userData.aboutyou}
                  name="name"
                  placeholder="Old Password"
                />
              </div>
              <button
                type="button"
                onClick={onSubmit}
                className={styles.login_button}
              >
                Submit
              </button>
              <p className={styles.change_password_text}>
                <Link href="/forgot-password-request">Forgot Password</Link>
              </p>
            </div>
            <div className={styles.login_image_box}>
                <Image src="/change-password.png" width={200} height={100} alt="change password" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
