import { useRef, useState, useEffect } from "react"
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LOGIN_URL = '/login'

const Login = () => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [pwd, user])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user: user, pwd: pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            console.log(`User is ${user}`)
            console.log(`password is ${pwd}`)
            console.log(response)
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const id = response?.data?.id;
            console.log(`id will be ${id}`)
            const roles = response.data?.roles;
            console.log(JSON.stringify(roles))
            setAuth({ user, pwd, roles })
            setUser('')
            setPwd('')
            navigate(from, { replace: true });

        }
        catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No server response')
            }
            else if (err?.response?.status === 400) {
                setErrMsg('Missing username or password')
            }
            else if (err?.response?.status === 401) {
                setErrMsg('unauthorized')
            }
            else {
                setErrMsg('Login Failed')
            }
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertlive">
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">
                    UserName
                </label>
                <input
                    type="text"
                    id="userName"
                    autoComplete="off"
                    required
                    ref={userRef}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />

                <label htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                />

                <button >Sign In</button>

            </form>

            <p>
                Need an Account? <br />
                <Link to="/register">Sign_Up</Link>
            </p>
        </section>


    )
}

export default Login
