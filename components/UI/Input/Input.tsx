type InputProps = {
    type: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    classes?: string;
};

const Input = ({ type, placeholder, onChange, classes }: InputProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={classes}
        />
    );
};

export default Input;
