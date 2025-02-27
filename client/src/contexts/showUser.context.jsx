import React, { createContext, useContext, useState } from 'react'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(false)
    return (
        <UserContext.Provider value={[userLogin, setUserLogin]}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider

export function useUser() {
    return useContext(UserContext)
}