import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const clientId = "31160760276-qoae32bmdbmp386qk79ap3e6itfol1lp.apps.googleusercontent.com";
const redirectUri = "https://testsite-eight-pied.vercel.app/oauth2callback";
const scope = "https://www.googleapis.com/auth/calendar.events.readonly";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&include_granted_scopes=true`;

function GoogleRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.hash.includes("access_token")) {
            navigate("/manageaccount");
        } else {
            window.location.href = authUrl;
        }
    }, [navigate]);

    return <p>Redirecting to Google...</p>; // Optional loading message
}

export default GoogleRedirect;