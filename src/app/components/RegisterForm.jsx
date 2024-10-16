'use client'

import React, { useState } from 'react';
import { RegisterAction } from '../serverAction/serverAction';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Change this import

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter(); // Now this is from next/navigation

    const registerHandler = async (e) => {
        e.preventDefault();
        const userRegisterDetails = { username, email, password };
        console.log(userRegisterDetails);

        try {
            const response = await RegisterAction(userRegisterDetails);
            if (response.success) {
                alert("Registration successful");
                router.push("/login");
            } else {
                setError(response.error);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError('An error occurred during registration.');
        }
    };

    return (
        <div className='formContainer'>
            <h2>Registration Page</h2>
            <form onSubmit={registerHandler} className='formSection'>
                <h2>Username</h2>
                <input
                    type="text"
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <h2>Email</h2>
                <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h2>Password</h2>
                <input
                    type="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type='submit'>Register</button>
                {error && <p className="error">{error}</p>}
            </form>

            <Link href="/login">
                Already Registered? Login
            </Link>
        </div>
    );
};

export default RegisterForm;
