import ExerciseElement from "./exerciseElement"

const ExerciseList = ({exercises}) => {
    
    const results =  exercises.map(ex => <ExerciseElement eId={ex} />)
    return (
        <main>{results}</main>
    )

}

export default ExerciseList