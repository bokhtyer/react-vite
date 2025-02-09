import React, { useState, useRef, useEffect } from "react";
import "./Tooltip.scss";

interface TooltipProps {
    children: React.ReactNode; // The element triggering the tooltip
    content: React.ReactNode; // The tooltip content
    position?: "top" | "bottom" | "left" | "right"; // Preferred tooltip position
    offset?: number; // Space between tooltip and trigger
    className?: string; // Additional custom styling
    width?: string; // Maximum width of the tooltip
    textAlign?: "left" | "center" | "right"; // Text alignment inside the tooltip
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = "top",
    offset = 8,
    className = "",
    width = "200",
    textAlign,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [dynamicPosition, setDynamicPosition] = useState(position);
    const [styles, setStyles] = useState<React.CSSProperties>({});
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const dynamicMaxWidth = `${width}px`;

    const updateTooltipPosition = () => {
        if (tooltipRef.current && triggerRef.current) {
            const tooltip = tooltipRef.current;
            const trigger = triggerRef.current;
            const triggerRect = trigger.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let calculatedPosition = position;
            // Adjust position dynamically based on available space
            if (position === "top" && triggerRect.top < tooltipRect.height + offset) {
                calculatedPosition = "bottom";
            } else if (position === "bottom" && viewportHeight - triggerRect.bottom < tooltipRect.height + offset) {
                calculatedPosition = "top";
            } else if (position === "left" && triggerRect.left < tooltipRect.width + offset) {
                calculatedPosition = "right";
            } else if (position === "right" && viewportWidth - triggerRect.right < tooltipRect.width + offset) {
                calculatedPosition = "left";
            }

            setDynamicPosition(calculatedPosition);

            const tooltipStyles: React.CSSProperties = {};
            switch (calculatedPosition) {
                case "top":
                    tooltipStyles.left = Math.max(
                        Math.min(
                            triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 - 8,
                            viewportWidth - tooltipRect.width
                        ),
                        0
                    );
                    tooltipStyles.top = triggerRect.top - tooltipRect.height - offset - 8;
                    break;
                case "bottom":
                    tooltipStyles.left = Math.max(
                        Math.min(
                            triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 - 8,
                            viewportWidth - tooltipRect.width
                        ),
                        0
                    );
                    tooltipStyles.top = triggerRect.bottom + offset;
                    break;
                case "left":
                    tooltipStyles.left = Math.max(triggerRect.left - tooltipRect.width - offset - 12, 0);
                    tooltipStyles.top = Math.max(
                        triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 - 4,
                        0
                    );
                    break;
                case "right":
                    tooltipStyles.left = Math.min(triggerRect.right + offset, viewportWidth - tooltipRect.width);
                    tooltipStyles.top = Math.max(triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2, 0);
                    break;
                default:
                    break;
            }

            setStyles(tooltipStyles);
        }
    };

    useEffect(() => {
        if (isVisible) {
            requestAnimationFrame(() => {
                updateTooltipPosition();
            });
        }
    }, [isVisible, position, offset]);

    useEffect(() => {
        const handleTouchOutside = (event: TouchEvent) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsVisible(false);
            }
        };

        if (isVisible) {
            document.addEventListener("touchstart", handleTouchOutside);
        }

        return () => {
            document.removeEventListener("touchstart", handleTouchOutside);
        };
    }, [isVisible]);

    const getTextAlign = () => {
        if (textAlign) return textAlign;
        if (dynamicPosition === "left") return "right";
        if (dynamicPosition === "right") return "left";
        return "center";
    };

    return (
        <div
            className="tooltip-container"
            ref={triggerRef}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            style={{ display: "inline-block", position: "relative" }}
        >
            <div className="tpt-btn">
                {children}
                <div
                    style={{
                        visibility: isVisible ? "visible" : "hidden",
                    }}
                    className={`tooltip-arrow ${isVisible ? "active" : ""} tooltip-arrow-${dynamicPosition}`}
                />
            </div>

            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`tooltip-box ${className} ${position}`}
                    style={{
                        position: "fixed",
                        zIndex: 9999,
                        visibility: isVisible ? "visible" : "hidden",
                        opacity: isVisible ? 1 : 0,
                        width: "100%",
                        maxWidth: dynamicMaxWidth,
                        textAlign: getTextAlign(),
                        ...styles,
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
