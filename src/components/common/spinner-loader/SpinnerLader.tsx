import "./Style.scss";
type SpinnerLoaderProps = {
    size?: string;
    borderWidth?: string;
    color?: string;
};
const SpinnerLoader = (props: SpinnerLoaderProps) => {
    const { size = "3rem", borderWidth = "2px", color = "var(--primary-color)" } = props;
    return (
        <div className="spiner-div-se">
            <span
                className="custom-spinner"
                style={{
                    width: size,
                    height: size,
                    borderWidth: borderWidth,
                    borderColor: color,
                    borderTopColor: "transparent",
                }}
            >
                <span className="spinner-inner"></span>
            </span>
        </div>
    );
};
export default SpinnerLoader;
