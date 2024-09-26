import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config
            },
            (error) => Promise.reject(error)
        )
        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config;
                if (error?.response.status === 403 && !prevReq?.sent) {
                    prevReq.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        console.log('New Access Token:', newAccessToken);  // Log the new access token
                        prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevReq);  // Retry the request with the new token
                    } catch (refreshError) {
                        console.error('Failed to refresh token:', refreshError);
                        return Promise.reject(refreshError);  // Handle refresh failure (e.g., redirect to login)
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;