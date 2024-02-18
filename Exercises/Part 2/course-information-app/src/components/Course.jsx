const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </>
    )
}

const Header = ({ name }) => {
    console.log("course name: ", { name })
    return (
        <h2>{name} </h2>
    )
}

const Content = ({ parts }) => {
    console.log({ parts })
    return (
        <>
            {parts.map(part => <Part key={part.id} name={part.name} number={part.exercises} />)}
        </>
    )
}

const Part = ({ name, number }) => {
    return (
        <p>{name} {number}</p>
    )
}

const Total = ({ total }) => {
    return (
        <h4>total of {total} exercises</h4>
    )
}

export default Course