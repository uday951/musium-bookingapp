"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const LoginHandler = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error || "Login failed");
    } else {
      // Redirect to home page after successful login
      router.push("/");
    }
  };

  return (
    <div className='formContainer'>
       <h1>login page</h1>
      <form onSubmit={LoginHandler} className='formSection'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2>Email</h2>
        <input
          type="email"
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <h2>Password</h2>
        <input
          type="password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type='submit'>Login</button> 
      </form>

      <Link href="/register">
      If not Registerd ? Register
      
      </Link>

    </div>
  );
};

export default UserLogin;
