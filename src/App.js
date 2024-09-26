import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import Linkpage from "./components/Linkpage";
import Unauthorize from "./components/Unauthorize";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

function App() {

  const Roles = {
    'Admin': 2222,
    "Editor": 3333,
    "User": 4444
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="linkpage" element={<Linkpage />} />
        <Route path="unauthorize" element={<Unauthorize />} />

        {/* protected Routes */}
        <Route element={<RequireAuth allowedRoles={[Roles.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all path */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
