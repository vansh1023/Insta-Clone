import React, { useState } from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'




const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


  
    const { handleLogin, loading } = useAuth()
    const navigate = useNavigate()



    async function submitHandler(e){
      e.preventDefault();

      const response = await handleLogin(username, password)
      console.log(response)
      navigate('/')

      setUsername("");
      setPassword("");
    }


    if(loading){
      return (
        <h1> Loading... </h1>
      )
    }




  return (
    <div>
        <main>
            <div className="form-container">
                <h1>Login Form</h1>
                <form onSubmit={submitHandler}>
                    <input
                    value={username}
                    onInput={(e) => {setUsername(e.target.value)}}
                    type="text" name="username" placeholder="Enter username"
                    />

                    <input
                    value={password}
                    onInput={(e) => {setPassword(e.target.value)}}
                    type="password" name="password" placeholder="Enter password"
                    />

                    <button> Login </button>
                </form>

                <p>Don't have an account! <Link className='toggleAuthForm' to='/register' > Register </Link> </p>
            </div>
        </main>
    </div>
  )
}





export default Login