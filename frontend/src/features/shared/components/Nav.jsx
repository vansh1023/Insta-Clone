import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router'

const Nav = () => {

    const navigate = useNavigate()

  return (
    <nav className='nav-bar'>
        <p onClick={() => {navigate('/')}}> Insta </p>
        {/* <button
        onClick={() => {navigate('/create-post')}}
        className='button primary-button'> New post </button> */}
        <div className="profile-wrapper">
          <div className="profile-image">
            <img src="data:image/png;base64,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" alt="" />
          </div>
        </div>
    </nav>
  )
}

export default Nav