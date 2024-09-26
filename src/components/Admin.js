import Users from "./Users"
import { Link } from "react-router-dom"


const Admin = () => {
  return (

    <section>
      <h1>Admin Page</h1>
      {<Users />}
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default Admin
