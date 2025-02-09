import React, { useState, useRef, useEffect } from "react";
import "./Tooltip.scss";
interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactElement;
    position?: "top" | "right" | "bottom" | "left";
    offset?: number;
}

const Tooltip2: React.FC<TooltipProps> = ({ content, children, position = "top", offset = 8 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    const calculatePosition = () => {
        if (!childRef.current || !tooltipRef.current) return;

        const childRect = childRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let x = 0;
        let y = 0;

        switch (position) {
            case "top":
                x = childRect.left + (childRect.width - tooltipRect.width) / 2;
                y = childRect.top - tooltipRect.height - offset;
                break;
            case "right":
                x = childRect.right + offset;
                y = childRect.top + (childRect.height - tooltipRect.height) / 2;
                break;
            case "bottom":
                x = childRect.left + (childRect.width - tooltipRect.width) / 2;
                y = childRect.bottom + offset;
                break;
            case "left":
                x = childRect.left - tooltipRect.width - offset;
                y = childRect.top + (childRect.height - tooltipRect.height) / 2;
                break;
        }

        setCoords({ x, y });
    };

    useEffect(() => {
        if (isVisible) {
            calculatePosition();
            setTimeout(() => {
                setIsVisible(true);
            }, 10); // Small delay to avoid flickering
            window.addEventListener("scroll", calculatePosition);
            window.addEventListener("resize", calculatePosition);

            return () => {
                window.removeEventListener("scroll", calculatePosition);
                window.removeEventListener("resize", calculatePosition);
            };
        }
    }, [isVisible]);

    return (
        <>
            <div
                ref={childRef}
                className="tooltip-trigger"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`tooltip-content ${isVisible ? "visible" : ""} ${position}`}
                    style={{
                        left: `${coords.x}px`,
                        top: `${coords.y}px`,
                    }}
                >
                    {content}
                    <div
                        className="tooltip-arrow"
                        style={{
                            ...(position === "top" && {
                                bottom: "-4px",
                                left: "50%",
                                marginLeft: "-4px",
                            }),
                            ...(position === "right" && {
                                left: "-4px",
                                top: "50%",
                                marginTop: "-4px",
                            }),
                            ...(position === "bottom" && {
                                top: "-4px",
                                left: "50%",
                                marginLeft: "-4px",
                            }),
                            ...(position === "left" && {
                                right: "-4px",
                                top: "50%",
                                marginTop: "-4px",
                            }),
                        }}
                    />
                </div>
            )}
        </>
    );
};
export default Tooltip2;
