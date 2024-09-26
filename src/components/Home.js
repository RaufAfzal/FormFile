import { Link } from "react-router-dom"

const Home = () => {
  return (
    <section>
      <h1>Home</h1> <br/>

      <p>You are logged in</p> <br/>

      <Link to="/editor">Go to Editor Page</Link>
      <br/>

      <Link to="/admin">Go to Admin Page</Link>
      <br/>

      <Link to="/lounge">Go to Lounge Page</Link>
      <br/>

      <Link to="/linkpage">Go to Link Page</Link>
      <br/>


    </section>
  )
}

export default Home
