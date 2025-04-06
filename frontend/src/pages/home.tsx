import { Link } from 'react-router-dom'

export const HomePage = () => (
    <>
        <h1>Welcome to Quizmaster!</h1>
        <Link to="/question/new">Create new question</Link>
    </>
)
