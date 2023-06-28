type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
    children: React.ReactNode;
    classes?: React.CSSProperties | string;
    onClick?(event: React.MouseEvent<HTMLButtonElement> | {}): void;
    type: ButtonType;
    ariaLabel: string;
}

const Button = ({
    children,
    classes,
    onClick,
    type,
    ariaLabel,
}: ButtonProps) => {
    return (
        <button
            type={type}
            aria-label={ariaLabel}
            onClick={onClick}
            className={`btn text-sm md:text-base ${classes || ''}`}
        >
            {children}
        </button>
    );
};

export default Button;
