import React, { createContext, useContext, useState } from 'react'

export const PromptDataContext = createContext()

const PromptDataProvider = ({ children }) => {
    const [promptData, setPromptData] = useState(null)
    return (
        <PromptDataContext.Provider value={[promptData, setPromptData]}>
            {children}
        </PromptDataContext.Provider>
    )
}
export default PromptDataProvider

export function usePromptData() {
    return useContext(PromptDataContext)
}