import React, {createContext, useState} from "react";

const AppContext = createContext()


const AppContextProvider = (props) => {
    const [user, setUser] = useState(null)

    return (
        <AppContext.Provider value={[user, setUser]}>
            {props.children}
        </AppContext.Provider>
    )
}
export {AppContext, AppContextProvider}