interface ProgressBarProps {
    readonly current: number
    readonly total: number
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => (
    <div>
        <span>
            You are on a question {current} / {total}
        </span>
        <br />
        <progress id="progress-bar" value={current} max={total} />
    </div>
)
