import company_logo from "../../public/logo.png";
import { userData } from "./sessionKeys";
import whiteLogo from "../assets/white-logo.png";
import avatar from "../assets/avatar.jpg";
// import mobile_logo from '../assets/image/mobile-logo.svg'
// import edit_icon from '../assets/image/edit-icon.svg'
// import company_white_logo from '../assets/image/whiteLogo.png'
const siteConfig = {
    company_name: "Company Name",
    logo: company_logo,
    white_logo: whiteLogo,
    avatar: avatar,
    header_mobile: "+1-222-345-6789",
    footer_mobile: "+123-456-7890",
    footer_email: "shamim@company.com",
    footer_address: "229 West 36th Street, New York, NY 10018, USA.",
    facebook_url: "#",
    instagram_url: "#",
    twitter_url: "#",
    currency: "#",
    userData: userData,
    role: {
        admin: "admin",
        user: "user",
    },
};

export default siteConfig;
