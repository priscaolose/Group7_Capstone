import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("access_token");
}

async function getEvents(accessToken) {
    if (!accessToken) {
        console.error("No access token found");
        return;
    }

    try {
        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            console.error("Failed to fetch events", await response.text());
            return;
        }

        const data = await response.json();
        console.log("User Events:", data.items);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

function Oauth2Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = getAccessTokenFromUrl();
        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            getEvents(accessToken);
            
        } else {
            console.error("No access token in URL");
        }
        navigate("/manageaccount");
    }, [navigate]);

    return <p>Processing authentication...</p>;
}

export default Oauth2Callback;