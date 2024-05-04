const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    ) 
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p>Number of exercises {parts.reduce((accumulator, {exercises}) => {return accumulator + exercises}, 0)}
      </p>
    </div>
  )
}

const Course = ({course}) => {
return (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)
}

export default Course