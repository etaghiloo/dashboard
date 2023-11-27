import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IdentityLayout from "./layouts/identity-layout";
import Login, { loginAction } from "./features/identity/components/login";
import Register, { registerAction } from "./features/identity/components/register";
import MainLayout from "./layouts/main-layout";
import Courses, { coursesLoader } from "./components/courses";
import CourseCategories, { courseCategoriesLoader } from "./components/courseCategories";

const msRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                element: <Courses />,
                index: true,
                loader: coursesLoader,
            },
            {
                path: "/course-categories",
                element: <CourseCategories />,
                loader: courseCategoriesLoader,
            }
        ]
    },
    {
        element: <IdentityLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
                action: loginAction,
                errorElement: <Login />
            },
            {
                path: "/register",
                element: <Register />,
                action: registerAction,
                errorElement: <Register />
            }
        ]
    },
]);
export default function MyRouter() {
    return (
        <RouterProvider router={msRouter} />
    )
}