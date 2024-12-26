import { environment } from "../loaders/environment.loader";

const { SPOTIFY_CLIENT_ID, REDIRECT_URI } = environment();

export const login = () => {
    console.log("hey im here")
    const clientId = SPOTIFY_CLIENT_ID!;
    const redirectUri = REDIRECT_URI!;
    const scope = 'user-read-email playlist-read-private';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`

    console.log("auth url",authUrl)
    return {
        redirect: authUrl
    };
};