import siteConfig from "../config/site-config";

// Regular expression for email validation
export const emailRegex = /^(?!.*\.{2})(?!.*@.*@)[a-zA-Z0-9.@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;

// Regular expression for password validation
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Regular expression for phone number validation
export const phoneRegex = /^\d{10}$/;

// Regular expression for name validation
export const nameRegex = /^[a-zA-Z\s]+$/;

// Regular expression for username validation
export const usernameRegex = /^[a-zA-Z0-9]+$/;

// Regular expression for alphanumeric validation
export const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;

// Regular expression for number validation
export const numberRegex = /^[0-9]+$/;

// Regular expression for decimal number validation
export const decimalRegex = /^\d+(\.\d{1,2})?$/;

// Regular expression for URL validation
export const urlRegex = /^(http|https):\/\/[^ "]+$/;

// Regular expression for IP address validation
export const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

// Regular expression for hex color validation
export const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Regular expression for date validation
export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Regular expression for time validation
export const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Regular expression for date and time validation
export const dateTimeRegex = /^\d{4}-\d{2}-\d{2} ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const webSiteTitle = (title: string) => {
    document.title = title ? `${title} | ${siteConfig.company_name}` : "YourWebsiteName";
};

export function showToast(message: string, type: string, time?: number) {
    let color = "";
    if (type === "e_error") {
        color = "rgb(203 0 65)";
    } else if (type === "download") {
        color = "#04012a";
    } else {
        color = "#02bb3c";
    }

    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = color;
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    toast.style.zIndex = "99999";

    document.body.appendChild(toast);
    setTimeout(
        () => {
            document.body.removeChild(toast);
        },
        time ? time : 3500
    );
}

// convert youtube url to embed
export const convertYouTubeUrlToEmbed = (url: string) => {
    const urlObj = new URL(url);
    let videoId: string = "";
    if (urlObj.hostname === "youtu.be") {
        videoId = urlObj.pathname.slice(1);
    }
    if (url.includes("youtube.com/shorts/")) {
        videoId = url.split("shorts/")[1]?.split("?")[0];
    } else if (urlObj.searchParams.has("v")) {
        videoId = String(urlObj.searchParams.get("v"));
    }
    // Return the embed URL
    return `https://www.youtube.com/embed/${videoId}`;
};
