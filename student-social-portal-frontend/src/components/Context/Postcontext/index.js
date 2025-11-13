import { Children, createContext, useContext, useEffect, useState } from "react";
import { Authcontext } from "../Authcontext";

export const Postcontext = createContext();

const { token ,user} = useContext(Authcontext)

export const Postprovider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let id = user._id
        const getProfilePosts = async () => {
            const api = `https://campusconnect-vp4m.onrender.com/api/posts/${id}/profile`

            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setPosts(data)
                console.log(data)
            }
        }
        if (token) {
            getProfilePosts();
        }
    }, [token])

return(
    <Postcontext.Provider value={{posts}}>

         {children}
    </Postcontext.Provider>
)

}