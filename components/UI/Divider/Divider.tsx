interface DividerProps {
    classes?: React.CSSProperties | string;
}

const Divider = ({ classes }: DividerProps) => {
    return <div className={`divider ${classes || ''}`} />;
};

export default Divider;
