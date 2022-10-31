import { useEffect,useState } from "react";
const { set } = require("mongoose")

const AddCoursePage = () =>{
    const [name , setName] = useState('')
    const [instructor , setInstructor] = useState('')
    const [level , setLevel] = useState('')
    const [summary , setSummary] = useState('')
    const [subject , setSubject] = useState('')
    const [cost , setCost] = useState('0')

    const [subTitle1,setSubtitle1] = useState('')
    const [subTitleEx1,setSubtitleEx1] = useState('')
    const [subTitleD1,setSubtitleD1] = useState('')

    const [subTitle2,setSubtitle2] = useState('')
    const [subTitleEx2,setSubtitleEx2] = useState('')
    const [subTitleD2,setSubtitleD2] = useState('')

    const [subTitle3,setSubtitle3] = useState('')
    const [subTitleEx3,setSubtitleEx3] = useState('')
    const [subTitleD3,setSubtitleD3] = useState('')

    const [subTitle4,setSubtitle4] = useState('')
    const [subTitleEx4,setSubtitleEx4] = useState('')
    const [subTitleD4,setSubtitleD4] = useState('')

    const [subTitle5,setSubtitle5] = useState('')
    const [subTitleEx5,setSubtitleEx5] = useState('')
    const [subTitleD5,setSubtitleD5] = useState('')




    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const courseSub = [
            {
                "Subtitle": subTitle1,
                "Exercises": subTitleEx1,
                "Subtitle Duration": subTitleD1
            },
            {
                "Subtitle": subTitle2,
                "Exercises": subTitleEx2,
                "Subtitle Duration": subTitleD2
            },
            {
                "Subtitle": subTitle3,
                "Exercises": subTitleEx3,
                "Subtitle Duration": subTitleD3
            },
            {
                "Subtitle": subTitle4,
                "Exercises": subTitleEx4,
                "Subtitle Duration": subTitleD4
            },
            {
                "Subtitle": subTitle5,
                "Exercises": subTitleEx5,
                "Subtitle Duration": subTitleD5
            }
        ]

        const course = {
            "NameOfCourse":name,
            "LevelOfCourse":level,
            "CourseSubtitle": courseSub,
            "Summary": summary,
            "Subject": subject,
            "Cost": cost
        }

        const response =  await fetch(`http://localhost:5000/addCourse/${instructor}`,{
            method: 'POST',
            body: JSON.stringify(course),
            headers : {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setName('')
            setLevel('')
            setSummary('')
            setSubject('')
            setCost(0)
            setError(null)
            console.log('New Course Added');
        }
    }


    return (
        <form className="createCourse" onSubmit={handleSubmit}>
            <h2>Add a new Course</h2>

            <label>Course Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value = {name}
            />
            <br />
            <label>Instructor:</label>
            <input
                type="text"
                onChange={(e) => setInstructor(e.target.value)}
                value = {instructor}
            />
            <br />
             <label>Course Level:</label>
            <input
                type="text"
                onChange={(e) => setLevel(e.target.value)}
                value = {level}
            />
            <br />
             <label>Summary:</label>
            <input
                type="text"
                onChange={(e) => setSummary(e.target.value)}
                value = {summary}
            />
            <br />
             <label>Subject</label>
            <input
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                value = {subject}
            />
            <br />
             <label>Cost:</label>
            <input
                type="number"
                onChange={(e) => setCost(e.target.value)}
                value = {cost}
            />
            <br />
            <br />
            <h3>Add Subtitle 1</h3>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setSubtitle1(e.target.value)}
                value = {subTitle1}
            />
            <br />
            <label>Exercise:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleEx1(e.target.value)}
                value = {subTitleEx1}
            />
            <br />
            <label>Duration:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleD1(e.target.value)}
                value = {subTitleD1}
            />
            <br />
            <h3>Add Subtitle 2</h3>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setSubtitle2(e.target.value)}
                value = {subTitle2}
            />
            <br />
            <label>Exercise:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleEx2(e.target.value)}
                value = {subTitleEx2}
            />
            <br />
            <label>Duration:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleD2(e.target.value)}
                value = {subTitleD2}
            />
            <br />
            <h3>Add Subtitle 3</h3>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setSubtitle3(e.target.value)}
                value = {subTitle3}
            />
            <br />
            <label>Exercise:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleEx3(e.target.value)}
                value = {subTitleEx3}
            />
            <br />
            <label>Duration:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleD3(e.target.value)}
                value = {subTitleD3}
            />
            <br />
            <h3>Add Subtitle 4</h3>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setSubtitle4(e.target.value)}
                value = {subTitle4}
            />
            <br />
            <label>Exercise:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleEx4(e.target.value)}
                value = {subTitleEx4}
            />
            <br />
            <label>Duration:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleD4(e.target.value)}
                value = {subTitleD4}
            />
            <br />
            <h3>Add Subtitle 5</h3>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setSubtitle5(e.target.value)}
                value = {subTitle5}
            />
            <br />
            <label>Exercise:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleEx5(e.target.value)}
                value = {subTitleEx5}
            />
            <br />
            <label>Duration:</label>
            <input
                type="text"
                onChange={(e) => setSubtitleD5(e.target.value)}
                value = {subTitleD5}
            />
            <br />
            <br />
            <button>Add Course</button>

            </form>

    )
}

export default AddCoursePage