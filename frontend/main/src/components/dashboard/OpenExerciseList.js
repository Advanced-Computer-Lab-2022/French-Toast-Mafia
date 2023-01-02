import OpenExerciseElement from "./openExerciseElement"

const OpenExerciseList = ({exercises , cId, uId}) => {
   
    const results =  exercises.map(ex => <OpenExerciseElement eId={ex} cId={cId} uId={uId} />)
    return (
        <main>{results}</main>
    )

}

export default OpenExerciseList