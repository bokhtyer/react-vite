import React, { useRef, useState, ReactNode, useEffect } from "react";
import { showToast } from "../../../helper/helper";

interface FileDownloadProps {
    path: {
        path: string;
        fileName?: string;
        fullPath?: string;
    };
    s3_base_url: string;
    children?: ReactNode; // Allows custom children
    clickDownload?: boolean;
    setClickDownload?: void | any;
}

const FileDownload: React.FC<FileDownloadProps> = ({
    path,
    s3_base_url,
    children,
    clickDownload,
    setClickDownload,
}) => {
    const abortController = useRef<AbortController | null>(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if (clickDownload) {
            downloadFile();
        }
    }, [clickDownload]);

    const downloadFile = async () => {
        // Cancel any ongoing download
        if (abortController.current) {
            abortController.current.abort();
        }

        abortController.current = new AbortController();
        try {
            setIsDownloading(true);
            const fileURL = !path?.fullPath ? `${s3_base_url}${path?.path}` : path?.fullPath;
            const response = await fetch(fileURL, { signal: abortController.current.signal });
            const totalSize = response.headers.get("content-length");
            if (!totalSize) {
                throw new Error("Content-Length header missing");
            }
            const downloadStream = response.body?.getReader();
            if (!downloadStream) {
                throw new Error("Readable stream not supported");
            }
            let receivedSize = 0;
            const chunks: Uint8Array[] = [];
            while (true) {
                const { done, value } = await downloadStream.read();
                if (done || !value) break;
                chunks.push(value);
                receivedSize += value.length;
                const newProgress = (receivedSize / parseInt(totalSize, 10)) * 100;
                setProgress(newProgress);
            }
            if (!abortController.current.signal.aborted) {
                // Create a blob and trigger download
                const blob = new Blob(chunks);
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = path.fileName || path.path; // Use the fileName or path
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                // Show success toast
                showToast("Download completed successfully!", "success");
                if (clickDownload) {
                    setClickDownload(false);
                }
            }
        } catch (error: any) {
            if (error.name === "AbortError") {
                showToast("Download canceled.", "e_error");
            } else {
                showToast("Error occurred while downloading the file.", "e_error");
            }
        } finally {
            setIsDownloading(false);
            abortController.current = null;
            setProgress(0);
            if (clickDownload) {
                setClickDownload(false);
            }
        }
    };

    const ProgressText = () => (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#04012a",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 99999,
            }}
        >
            {`Downloading (${progress.toFixed(2)}%)`}
        </div>
    );

    return (
        <>
            <div onClick={downloadFile} style={{ cursor: isDownloading ? "not-allowed" : "pointer" }}>
                {children}
            </div>
            {isDownloading && ProgressText()}
        </>
    );
};

export default FileDownload;
