'use client'
import styles from './page.module.css'
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import Login from "@/app/api/Login";
import Authorise from "@/app/api/Authorise";

function Auth() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const status = await Authorise();
      if (status === 200) { router.push("/"); }
    }
    void checkAuth();
  });

  let response = { message: '' };
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username').trim()
    const password = formData.get('password').trim()

    response = await Login({username, password})

    if (response.message === 'passed') { router.push('/'); }
    else { setMessage(response.message); }
  }

  return (
    <div className={styles.page}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 style={{textAlign: 'center'}}>AgroExchange</h1>
        <input type={'text'} name={'username'} placeholder={'Пользователь'} required />
        <input type={'password'} name={'password'} placeholder={'Пароль'} required />
        <button type={'submit'}>Войти</button>
        { message ? <p style={{color: 'var(--text-danger)'}}>{message}</p> : null }
      </form>
    </div>
  );
}

export default Auth;