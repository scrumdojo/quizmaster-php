export interface WithOnClick {
    readonly onClick: () => void
}

interface ButtonProps extends WithOnClick {
    readonly id?: string
    readonly className?: string
    readonly type?: 'button' | 'submit'
    readonly children: React.ReactNode
}

export const Button = ({ id, className, type = 'button', onClick, children }: ButtonProps) => (
    <button id={id} type={type} className={`submit-btn ${className}`} onClick={onClick}>
        {children}
    </button>
)
