 import { lazy } from "react";
 import { Navigate } from "react-router-dom";
// import { browserHistory } from 'react-router';
import React from 'react';
import CreateCourse from "../views/createCourse.js";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Home = lazy(() => import("../views/Home.js"));
const HomeCop = lazy(() => import("../views/HomeCop.js"));
const HomeAdmin = lazy(() => import("../views/HomeAdmin.js"));

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
const CourseRate= lazy(() => import('../views/CourseRate.js'));

const CourseReports = lazy(() => import('../views/CourseReports'))

const CourseSubtitles= lazy(() => import('../views/CourseSubtitles.js'));
const Contract = lazy (() => import ('../views/ui/Contract.js'));

const ViewCourse = lazy(() => import("../views/viewCourse.js"));
const EditCourse = lazy(() => import("../views/editCourse.js"));
const ViewCourseCop = lazy(() => import("../views/viewCourseCop.js"));

const ViewCourseA = lazy(() => import("../views/viewCourseA.js"));

const ViewReport = lazy(() => import("../views/viewReport.js"));

const ViewRequest = lazy(() => import("../views/viewRequest.js"));

const AdminDashboard = lazy(() => import("../views/AdminDashboard"));
const ViewReportAdmin = lazy(() => import("../views/viewReportAdmin"));


const Instructors= lazy(() => import('../views/Instructors.js'));
const InstructorCourses= lazy(() => import('../views/InstructorCourses.js'));
const InstructorCoursePage= lazy(() => import('../views/InstructorCoursePage.js'));
const InstrCourseExams= lazy(() => import('../views/InstrCourseExams.js'));

const CreateExam= lazy(() => import('../views/CreateExam.js'));
const InstrExamPage= lazy(() => import('../views/InstrExamPage.js'));
const AddMcq= lazy(() => import('../views/AddMcq.js'));

const CourseExams= lazy(() => import('../views/CourseExams.js'));
const ViewExam= lazy(() => import('../views/ViewExam.js'));
const ViewExamAnswer= lazy(() => import('../views/ViewExamAnswer.js'));
const ExamIsDone= lazy(() => import('../views/ExamIsDone.js'));

const CertificatePage= lazy(() => import('../views/CertificatePage.js'));

const InstructorProfile= lazy(() => import('../views/InstructorProfile.js'));
const InstructorInfo= lazy(() => import('../views/InstructorInfo.js'));
const InstructorBalance= lazy(() => import('../views/InstructorBalance.js'));


const InstructorDashboard= lazy(() => import('../views/InstructorDashboard.js'));
const ViewExercise = lazy(() => import('../views/viewExercise'));
const SearchInstructorCourses = lazy(() => import('../views/searchInstructorCourses'));

const UserDashboard = lazy(() => import('../views/UserDashboard.js'));
const OpenCourse = lazy(() => import('../views/openCourse.js'));



// /*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
     { path: "/", exact:true, element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Home /> },
      { path: "/homeCop", exact: true, element: <HomeCop /> },
      { path: "/homeA", exact: true, element: <HomeAdmin /> },


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

      { path: "/viewCourse", exact: true, element: <ViewCourse /> },
      { path: "/openCourse", exact: true, element: <OpenCourse /> },
      { path: "/editCourse", exact: true, element: <EditCourse /> },
      { path: "/createCourse", exact: true, element: <CreateCourse/>},
      { path: "/viewCourseCop" , exact: true, element: <ViewCourseCop/> },
      { path: "/viewCourseA" , exact: true, element: <ViewCourseA/> },

      { path: "/viewCourseReports", exact: true, element: <CourseReports /> },
     
      { path: "/viewReport", exact: true, element: <ViewReport /> },
      { path: "/viewRequest", exact: true, element: <ViewRequest /> },


      { path: "/CourseRate", exact: false, element: <CourseRate /> },
      { path: "/CourseSubtitles", exact: false, element: <CourseSubtitles /> },
      { path: "/CourseVideos", exact: false, element: <CourseVideos /> },
      { path: "/Contract", exact: true, element: <Contract /> },

      { path: "/Instructors", exact: true, element: <Instructors /> },
      { path: "/InstructorCourses", exact: false, element: <InstructorCourses /> },
      { path: "/InstructorCoursePage", exact: false, element: <InstructorCoursePage /> },
      { path: "/InstrCourseExams", exact: false, element: <InstrCourseExams /> },

      { path: "/InstructorHome", exact: false, element: <InstructorDashboard /> },
      { path: "/searchInstructorCourses", exact: false, element: <SearchInstructorCourses /> },
      { path: "/viewExercise", exact: false, element: <ViewExercise /> },
      

      { path: "/UserHome", exact: false, element: <UserDashboard /> },

      { path: "/CreateExam", exact: false, element: <CreateExam />},
      { path: "/InstrExamPage", exact: false, element: <InstrExamPage /> },
      { path: "/AddMcq", exact: false, element: <AddMcq /> },

      { path: "/CourseExams", exact: false, element: <CourseExams /> },
      { path: "/ViewExam", exact: false, element: <ViewExam /> },
      { path: "/ViewExamAnswer", exact: false, element: <ViewExamAnswer /> },
      { path: "/ExamIsDone", exact: false, element: <ExamIsDone /> },
      { path: "/CertificatePage", exact: false, element: <CertificatePage />},

      { path: "/InstructorProfile", exact: false, element: <InstructorProfile/> },
      { path: "/InstructorInfo", exact: false, element: <InstructorInfo/> },
      { path: "/InstructorBalance", exact: false, element: <InstructorBalance/> },

      { path: "/AdminHome" , exact: false, element: <AdminDashboard/> },
      { path: "/ViewReport_A" , exact: false, element: <ViewReportAdmin/> },

    ],
  },
];

 export default ThemeRoutes;



