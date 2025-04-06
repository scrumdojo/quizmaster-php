import { Button, type WithOnClick } from 'pages/components/button'

export const NextButton = ({ onClick }: WithOnClick) => (
    <Button id="next" onClick={onClick}>
        Next Question
    </Button>
)

export const EvaluateButton = ({ onClick }: WithOnClick) => (
    <Button id="evaluate" className="submit-btn-evaluate" onClick={onClick}>
        Evaluate
    </Button>
)
