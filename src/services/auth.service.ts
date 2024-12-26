import { environment } from "../loaders/environment.loader";
import { fetch } from "bun";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = environment();

export const login = () => {
    const clientId = SPOTIFY_CLIENT_ID!;
    const redirectUri = REDIRECT_URI!;
    const scope = 'user-read-email playlist-read-private';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`

    console.log("auth url",authUrl)
    return {
        redirect: authUrl
    };
};

export const handleCallback = async (query:{code: string}) => {
const {code} = query;
    console.log("code", code)

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString('base64')}`
        },
        body: new URLSearchParams({
            code,
            redirect_uri: REDIRECT_URI!,
            grant_type: 'authorization_code'
        })
    });

    const data = await response.json();
    return data;
};