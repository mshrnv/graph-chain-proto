import {PROFILE_ROUTE, GRAPH_PAGE, LIST_GRAPH_PAGE, START_PAGE} from "./utils/consts";
import GraphPage from "./pages/GraphPage";
import ListGraphPage from "./pages/ListGraphPage";
import ProfilePage from "./pages/ProfilePage";
import StartPage from "./pages/StartPage";
import {Navigate} from "react-router-dom";

export const authRoutes = [
    {
        path: LIST_GRAPH_PAGE,
        component: <ListGraphPage/>
    },
    {
        path: PROFILE_ROUTE,
        component: <ProfilePage/>
    },
    {
        path: GRAPH_PAGE,
        component: <GraphPage/>
    },
    {
        path: '*',
        component: <Navigate to='/'/>
    }
]
export const publicRoutes = [
    {
        path: START_PAGE,
        component: <StartPage/>
    },

]