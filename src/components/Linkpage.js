import React from 'react'
import { Link } from 'react-router-dom'

const Linkpage = () => {
  return (
    <section>
      <h1>Links</h1> <br/>
      <h2>public </h2> <br/>

      <Link to="/login">Login Page</Link>
      <Link to="/register">Register Page</Link>

      <h2>private </h2> <br/>

      <Link to="/">Home</Link>
      <Link to="/editor">Editor</Link>
      <Link to="/lounge">Lounge</Link>




    </section>
  )
}

export default Linkpage
