import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
const Users = () => {
    const [users, setUsers] = useState('')
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            try {
                const response = await axiosPrivate.get('/employees', {
                    signal: controller.signal
                })
                const data = response.data
                console.log(data)
                isMounted && setUsers(data)

            }
            catch (err) {
                console.log(`Error is going to be ${err}`)
            }
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])
    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => {
                        <li key={i}>{user?.usernamee}</li>
                    })}
                </ul>
            ) : <p>No user to display</p>}

        </article>
    )
}

export default Users
