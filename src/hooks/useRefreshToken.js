import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(`Prev state is ${JSON.stringify(prev)}`);
            console.log(`Response access token is ${response.data.accessToken}`);
            return { ...prev, accessToken: response.data.accessToken }
        })
        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken
