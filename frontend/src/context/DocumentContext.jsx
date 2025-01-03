import React, { createContext, useEffect, useState } from 'react'

export const DocumentDataContext = createContext()

const DocumentContext = ({children}) => {
    const [allDocs, setallDocs] = useState(
        () => localStorage.getItem("allDocs") ? JSON.parse(localStorage.getItem("allDocs")) : []
    )

    useEffect(() => {
        localStorage.setItem("userDocs",JSON.stringify(allDocs))
    },[allDocs])

    return (
        <DocumentDataContext.Provider value={{allDocs,setallDocs}}>
            {children}
        </DocumentDataContext.Provider>
    )
}

export default DocumentContext