import "./CustomPageLoader.scss";
export default function CustomPageLoader(props: { pageLoader?: boolean; className?: string }) {
    return props.pageLoader ? (
        <div className={`overlay ${props.className}`}>
            <div className="loader"></div>
        </div>
    ) : (
        ""
    );
}
