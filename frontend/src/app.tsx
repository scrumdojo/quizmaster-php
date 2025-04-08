import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QuestionTakePage } from 'pages/question-take'
import { HomePage } from 'pages/home'
import { Quiz } from 'pages/quiz'
import { CreateQuestionContainer } from 'pages/create-question/create-question-container'
import { EditQuestionContainer } from 'pages/create-question/edit-question-container'

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/question/new" element={<CreateQuestionContainer />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/question/:id/edit" element={<EditQuestionContainer />} />
            <Route path="/question/:id" element={<QuestionTakePage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
)
