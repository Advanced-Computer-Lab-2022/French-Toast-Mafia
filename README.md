# French-Toast-Mafia
## Online Learning System :books: 
Online Learning System is a web application through which individuals can attend pre-recorded courses online. :man_teacher:
## Motivation :zap:
This project aim was to help us: <br/>
• Learn how to properly use the Agile Methodology to plan out a project and develop the software. <br/>
• Learn the process of following a given set of System Requirements to develop a software and work together as a Team on Github. <br/>
• Learn to research and master the use of the MERN Stack. <br/>
## Build Status :hammer_and_wrench:
• For the user, he'll only be able to report a problem or rate the instructor, but in the future we intend to build a chat system between the users and their instructors
## Code Style :sunglasses:
Our code style is a standard code style.
## Project Description
### Theme
! Our project is an online learning platform that helps individual and cooperate trainees to enroll in a variety of courses and check/track their progress in this course such that there aim is to earn a certificate of completion of there courses. Our platform provide a wide range of courses that are taught by experienced and well rated instructors who have created lectures and challenging exams and excersises to encourage students more and help them master the material provided. 
! The platform also help instructors to manage their courses and admins to track the requests they receive upon any report or granting access.
### Overview
Our project was developed using the Agile Methodology, such that it was divided into 3 sprints (time periods). Each sprint was evaluated gave us the chance to correct and edit some methods that helped later in developing a fully functioned website.
## Screenshots :camera_flash:
### A) As a guest, you can sign up
![Sign Up](https://user-images.githubusercontent.com/58050300/210186469-e4f80248-210f-47e6-94b7-d594378f0e1a.png)
### B) You can view a course
![view Course Trainee](https://user-images.githubusercontent.com/58050300/210186488-2d9dc906-3248-4f17-b40e-46d2215039b3.png)
### C) As a registered user, you can pay for a course
![pay for a course](https://user-images.githubusercontent.com/58050300/210186504-9f298f58-20cc-421e-926b-9fb2d28e8713.png)
### D) You can report a problem
![Report problem ](https://user-images.githubusercontent.com/58050300/210186518-c3cf2308-9a17-47a3-9563-2ce5afe548a1.png)
### E) As a user, you can solve an exam
![Exam](https://user-images.githubusercontent.com/58050300/210186521-7383c8c9-4fe1-4fcf-b9d7-ea4e11aff0be.png)
### F) You can change your password
![Forget password](https://user-images.githubusercontent.com/58050300/210186527-7be2bb25-5dbb-434e-839b-5887288361e1.png)

## Tech/Framework used :bulb:
We used [MERN Stack](https://www.mongodb.com/mern-stack) to implement this project. <br/>

 * <strong>MERN<strong> stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack. <br/>
 • [MongoDB](https://www.mongodb.com) <br/>
 • [Express.js](https://expressjs.com) <br/>
 • [React.js](https://reactjs.org) <br/>
 • [Node.js](https://nodejs.org/en/) <br/>
 • [Git](https://git-scm.com/) <br/>
 • [Visual studio code](https://code.visualstudio.com/) <br/>
 • [Joi](https://joi.dev/) <br/>
 • [JWT](https://jwt.io/) <br/>
 • [Postman](https://www.postman.com/) <br/>
 • [Stipe](https://stripe.com) <br/>


## Features :star2:
### For Users:<br/>
    •  Can a preview video about the course before registering to it. 
    •  While enrollment in the course, he'll be able to see his/her progress in the course 
       as a percentage of how much of the course has been completed so far.
    •  Can request a refund if his progress in the course is less than 50%.
    •  Can retake an exam if his grade is less than 50%.
    •  Can download his notes while watching the course videos.
    •  Can recieve a certificate upon completing the course.
    
### For Instructors:<br/>
    • Can view the amount of money owed per month.
    • Can define a promotion for the course and for how long.
    • Can view the average grades of the exams in his course.
    • Can save his/her progress in creating a course WITHOUT publishing the course.
    • Can publish his/her course. A published course CANNOT be edited nor deleted.
## Code Examples :computer:
![Code](https://user-images.githubusercontent.com/58050300/210185679-11df031c-2095-47cb-a58d-3763836b9add.png)
## Installation :arrow_down:
   ### A) Clone the Repository to your device :computer:

   ### B) Open 2 Terminals

   ### C) In the first terminal, run the front end by running the following commands in order:
```
cd frontend/main/src
```
```
npm install
```
```
npm start
```
  ### D) In the second terminal, run the back end by running the following commands in order:
```
cd backend 
```
```
nodemon app.js
```
## API reference :bookmark_tabs:
• [Axios](https://axios-http.com/docs/api_intro) for communication between the frontend and backend
   
• [Stripe](https://stripe.com/docs/api) for online payments
   
• [Nodemailer](https://nodemailer.com/about/) for sending emails to clients :mailbox:
## Tests :microscope:
 ### Authentication routes
  create user
 ```
POST /Signup//
```
 Login 
  ```
POST /Login//
```
 Filter course rating 
  ```
GET /User/viewcoursetitlehoursrating
```
 Filter course price 
  ```
GET /User/viewcourseprice
```
Get my information
```
GET /User/viewMyInfo
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. user ID   |
```
 Get my courses
  ```
GET /User/viewMyCourses
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. user ID   |
```
 Change password 
  ```
PUT /User/changePassword
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. user ID   |
```
 User add course 
 ```
POST /User/addCourse
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. User ID   |
| `courseId` | `string` | **Required**. Course ID   |
  ```
 Send password change email 
  ```
POST /User/sendPassChangeMail
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `Email` | `string` | **Required**. user Email   |
  ```
 Remove course 
 ```
PUT /User/removeCourse
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. user ID   |
  ```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `--` | `string` | **Required**. Course ID  |
  ```
 User Refund 
 ```
POST /User/userRefund
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. User ID   |
| `courseId` | `string` | **Required**. Course ID   |
  ```
 Update video progress 
 ```
POST /User/videoProgress
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. User ID   |
| `courseId` | `string` | **Required**. Course ID   |
| `subtitleId` | `string` | **Required**. Subtitle ID   |

```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `Video` | `string` | **Required**. Video Link   |
  ```
 Get My progress 
  ```
GET /User/getUserProgress
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. User ID   |
| `courseId` | `string` | **Required**. Course ID   |

```
 Send Certificate 
  ```
GET /User/sendCertificate
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. User ID   |

```
 See my grades 
  ```
GET /User/getUserGrades
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. User ID   |
| `examId` | `string` | **Required**. Exam ID   |

```
 See my info 
  ```
GET /User/getUser
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. User ID   |

```
 Remove unknown courses 
 ```
GET /User/removeUnknownCourses
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. User ID   |

```
 Add promotion 
 ```
POST /Instructor/addPromotion
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Course ID   |

```

```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `Promotion` | `string` | **Required**. Course ID   |
| `Start Promotion` | `string` | **Required**. Course ID   |
| `End Promotion` | `string` | **Required**. Course ID   |

```
 Instructor add Course 
 ```
POST /Instructor/addCourse
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |

```
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `NameOfCourse` | `string` | **Required**. Name Of Course  |
| `Summary` | `string` | **Required**. summary   |
| `Subject` | `string` | **Required**. subject  |
| `LevelOfCourse` | `string` | **Required**. Level of course   |
| `Cost` | `string` | **Required**. Cost   |
| `Preview` | `string` | **Required**.Preview  |


```

 Instructor delete course 
 ```
POST /Instructor/deleteCourse
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Course ID   |

```
 Instructor add exam 
  ```
POST /Instructor/addExam
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |
```
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |
| `question` | `string` | **Required**. Question |
| `choice1` | `string` | **Required**. Choice1 |
| `choice2` | `string` | **Required**. Choice2  |
| `choice3` | `string` | **Required**. Choice3 |
| `choice4` | `string` | **Required**. Choice4   |
| `correct` | `string` | **Required**. Correct  |

```
 Instructor edit his biography 
  ```
POST /Instructor/editInstrBiography
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |

```
 Instructor edit his email 
  ```
POST /Instructor/editInstrEmail
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |

```
 Instructor edit his data 
 ```
POST /Instructor/editInstructorData
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |

```
 Instructor view his courses 
 ```
GET /Instructor/ViewMyCourses
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |

```
 Instructor view his ratings
 ```
GET /Instructor/ViewMyRatings
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |

```
 Instructor view his reviews 
  ```
GET /Instructor/ViewMyReview
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |

```
 Instructor money in wallet 
  ```
GET /Instructor/calculateMoney
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `instrId` | `string` | **Required**. Instructor ID   |

```
 Instructor remove exam 
  ```
GET /Instructor/removeExam
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Instructor ID   |

```
 Admin add Instructor 
  ```
POST /Admin/addInstructor
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `InstrEmail` | `string` | **Required**. Instructor Email  |
| `InstrPassword` | `string` | **Required**. Instructor Password   |

```
 Admin add cooperate trainees
 ```
POST /Admin/createCorporateTrainess
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `Name` | `string` | **Required**. User Name  |
| `Email` | `string` | **Required**. User Email   |
| `Password` | `string` | **Required**. Password  |
| `Type` | `string` | **Required**. Type |
| `Gender` | `string` | **Required**. Gender  |

```
 Admin view course reports 
 ```
GET /Report/viewCourseReports
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. CourseId  |
```
 Admin get reported courses 
 ```
GET /Report/getReportedCourse
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. CourseId  |
```
 Admin view reporter name 
  ```
GET /Report/getReporterName
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. userId  |
```
 Admin delete report 
  ```
GET /Report/delete
```
 Admin get all reports 
  ```
GET /Report/getReport
```
 Admin update type of request 
  ```
GET /Report/updateType
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. CourseId  |
```
 Admin update status of request 
  ```
POST /Report/updateStatus
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. CourseId  |
```
 Admin add a followup 
  ```
POST /Report/addFollowup
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. report id  |
```
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. follow id  |
| `comment` | `string` | **Required**. comment |
```
 Admin delete followup 
  ```
GET /Report/deleteFollowup
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. report id  |
```
 Instructor get all subtitles 
  ```
 GET/Subtitle/getAllSubtitles
 ```
 Instructor add subtitles 
  ```
 POST/Subtitle/addSubtitle
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. course id  |
```
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `Title` | `string` | **Required**. Title  |
| `Description` | `string` | **Required**. Description |
| `Duration` | `string` | **Required**. Duration  |
```
 Instructor edit subtitle 
  ```
 POST/Subtitle/editSubtitle
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. Subtitle Id  |
```
 Instructor add excercise for subtitle 
  ```
 POST/Subtitle/addExcercise
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id  |
```
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `Question` | `string` | **Required**. question  |
| `Answer` | `string` | **Required**. answer |
```
 Instructor remove all excercises
  ```
 POST/Subtitle/removeAllExcercises
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id  |
```
 Instructor delete subtitles
  ```
 GET/Subtitle/deleteSubtitle
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id  |
```
 Instructo rdelete subtitles from course 
  ```
 GET/Subtitle/deleteSubtitleFromCourse
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id  |
```
 Instructor remove all subtitles
  ```
 GET/Subtitle/removeAllSubtitles
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id  |
```
 User get course subtitles videos 
  ```
 GET/Subtitle/getCourseSubtitlesVideo
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. course id  |
```
 User get course subtitles excercises  
  ```
 GET/Subtitle/getCourseSubtitlesExcercises
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. course id  |
```
 Instructor add video description for subtitles 
  ```
 POST/Subtitle/addVideoDescription
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. course id  |
```
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `---` | `string` | **Required**. Description  |
```
 User get excercises Questions 
  ```
 GET/Subtitle/getExcercisesQuestions
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. course id  |
```
 User get excercises answers
  ```
 GET/Subtitle/getExcercisesAnswers
```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. course id  |
```
 User add notes
  ```
 POST/Subtitle/addNotes
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id  |
```
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `---` | `string` | **Required**. Notes |
```
 User view course subtitles
  ```
 GET/Subtitle/viewAllCourseSubtitles
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. courseId |
```
User view course subtitles videos 
  ```
 GET/Subtitle/viewSubtitleVideo
 ```
 | Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id |
```
User view course subtitles notes 
  ```
 GET/Subtitle/viewSubtitleNotes
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id |
```
Instructor clear all excercises
  ```
 GET/Subtitle/clearAllExercises
 ``` 
 Instructor add video
  ```
 POST/Subtitle/addVideo
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id |
```
```
| Body        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `video` | `string` | **Required**. video |
```
 Instructor add course exam
  ```
 POST/Subtitle/addCourseExam
 ```
| Query        | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id` | `string` | **Required**. subtitle id |
```

 
 
For testing our website:
- try searching for a course and filter your search results
- try viewing a course and watch its preview
- try signing up 
- try go to your profile and edit your info
- try changing your password
## How to Use? :question:
Open http://localhost:3000/#/home to view the homepage in your browser.
## Contribute :inbox_tray:
To contribute to our project, you can check our [Contribution Guidelines](CONTRIBUTING.md) 
## Credits :white_check_mark:
### The main resources that helped us in our implementation :
https://www.youtube.com/@NetNinja <br/>
https://mui.com/ <br/>
https://react-bootstrap.github.io/getting-started/introduction/ <br/>
https://www.npmjs.com/ <br/>
## License :black_nib:
[Apache 2.0 License](LICENSE.md)
