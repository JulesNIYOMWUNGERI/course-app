import {useState} from "react";
import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";

import {Navbar, Sidebar} from "../components";
import CourseLayout from "./CourseLayout";
import Administration from "../pages/Administration/Administration";
import CourseManagement from "../pages/Course/CourseManagement/CourseManagement";
import CourseOverview from "../pages/Course/CourseOverview/CourseOverview";
import Home from "../pages/Home/Home";
import CourseDetailsOverview from "../pages/Course/CourseDetailsOverview/CourseDetailsOverview";
import {CourseFilePreviewPage} from "../pages/Course/CourseFilePreviewPage/CourseFilePreviewPage.tsx";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} onClick={toggleSidebar}/>
            <>
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <Outlet/>
            </>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/administration",
                element: <Administration/>,
            },
            {
                path: "/course",
                element: <CourseLayout/>,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/course/overview" replace/>,
                    }
                    ,
                    {
                        path: "management",
                        element: <CourseManagement/>,
                    },
                    {
                        path: "overview",
                        element: <CourseOverview/>,
                    },
                    {
                        path: "details/:id",
                        element: <CourseDetailsOverview/>,
                    },
                    {
                        path: "details/:id/preview/:fileId",
                        element: <CourseFilePreviewPage/>
                    }
                ],
            },
        ],
    },
], {
    basename: "/home"
});

export default router;
