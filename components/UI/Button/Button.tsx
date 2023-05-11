type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
    children: React.ReactNode;
    classes?: React.CSSProperties | string;
    onClick?(event: React.MouseEvent<HTMLButtonElement> | {}): void;
    type: ButtonType;
}

const Button = ({ children, classes, onClick, type }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn ${classes || ''}`}
        >
            {children}
        </button>
    );
};

export default Button;
