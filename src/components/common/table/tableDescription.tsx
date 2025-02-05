export default function TableDescription({ text, maxWidth }: { text: string; maxWidth: string }) {
    return (
        <div style={{ maxWidth: maxWidth }}>
            <span className="mb-0" style={{ whiteSpace: "normal" }}>
                {text}
            </span>
        </div>
    );
}
