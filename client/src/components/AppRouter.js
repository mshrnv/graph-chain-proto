import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'

import {authRoutes, publicRoutes} from "../routes";
import {AppContext} from "./AppContext";

const AppRouter = () => {
    const [user, setUser] = useContext(AppContext)

    return (
        user ? (
            <Routes>
                {authRoutes.map(({path, component}) =>
                    <Route
                        path={path} element={component} key={path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
        ) : (
            <Routes>
                {publicRoutes.map(({path, component}) =>
                    <Route
                        path={path} element={component} key={path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to="/start" replace/>}
                />
            </Routes>
        )


    )
}

export default AppRouter