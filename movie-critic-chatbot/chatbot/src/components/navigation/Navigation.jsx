import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
      <ul>
        <li>
            <Link to={"/welcome"}>Welcome</Link>
        </li>
        <li>
            <Link to={"/chatbox"}>Chatbox</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
