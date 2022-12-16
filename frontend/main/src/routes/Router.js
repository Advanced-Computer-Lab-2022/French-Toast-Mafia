 import { lazy } from "react";
 import { Navigate } from "react-router-dom";
// import { browserHistory } from 'react-router';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Home = lazy(() => import("../views/Home.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

const ForgotPassword = lazy(() => import('../views/ForgotPassword.js'));
const ChangePassword = lazy(() => import('../views/ChangePassword.js'));

const Users= lazy(() => import('../views/Users.js'));
const MyCourses= lazy(() => import('../views/MyCourses.js'));
const UserCoursePage= lazy(() => import('../views/UserCoursePage.js'));
const CourseInstructor= lazy(() => import('../views/CourseInstructor.js'));
const CourseVideos= lazy(() => import('../views/CourseVideos.js'));
const CourseExercises= lazy(() => import('../views/CourseExercises.js'));
const CourseRate= lazy(() => import('../views/CourseRate.js'));

// /*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
     { path: "/", exact:true, element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Home /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },

      { path: "/forgotPass", exact: true, element: <ForgotPassword /> },
      { path: "/changePassword", exact: true, element: <ChangePassword /> },
      { path: "/Users", exact: true, element: <Users /> },
      { path: "/MyCourses", exact: false, element: <MyCourses /> },
      { path: "/UserCoursePage", exact: false, element: <UserCoursePage /> },
      { path: "/CourseInstructor", exact: false, element: <CourseInstructor /> },
      { path: "/CourseVideos", exact: false, element: <CourseVideos /> },
      { path: "/CourseExercises", exact: false, element: <CourseExercises /> },
      { path: "/CourseRate", exact: false, element: <CourseRate /> },

    ],
  },
];

 export default ThemeRoutes;



