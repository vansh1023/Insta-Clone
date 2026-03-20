import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    async function submitHandler(e){
      e.preventDefault();

      


      setUsername("");
      setEmail("");
      setPassword("");
    }

  return (
    <div>
        <main>
            <div className="form-container">
                <h1>Register Form</h1>
                <form onSubmit={submitHandler}>
                    <input
                    value={username}
                    onInput={(e) => {setUsername(e.target.value)}}
                    type="text" name="username" placeholder="Enter username"
                    />

                    <input
                    value={email}
                    onInput={(e) => {setEmail(e.target.value)}}
                    type="text" name="email" placeholder="Enter email"
                    />

                    <input
                    value={password}
                    onInput={(e) => {setPassword(e.target.value)}}
                    type="password" name="password" placeholder="Enter password"
                    />

                    <button> Register </button>
                </form>

                <p>Aready have an account! <Link className='toggleAuthForm' to='/login' > Login </Link> </p>
            </div>
        </main>
    </div>
  )
}

export default Register