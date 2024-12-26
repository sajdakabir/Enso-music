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

export const handleCallback = async (query: { code: string }) => {
    const { code } = query;

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString('base64')}`,
        },
        body: new URLSearchParams({
            code,
            redirect_uri: REDIRECT_URI!,
            grant_type: 'authorization_code',
        }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
        throw new Error(`Failed to get access token: ${tokenData.error}`);
    }

    console.log('Access Token Data:', tokenData);

    const { access_token, refresh_token } = tokenData;

    const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
        throw new Error(`Failed to fetch user details: ${userData.error}`);
    }

    console.log('User Data:', userData);

    // Step 3: Save user data to your database (example logic)
    const user = {
        id: userData.id,
        displayName: userData.display_name,
        email: userData.email,
        profileUrl: userData.external_urls?.spotify,
        image: userData.images?.[0]?.url || null,
        accessToken: access_token,
        refreshToken: refresh_token,
    };

    // Replace with your DB logic
    await createUser(user);

    return tokenData;
};

export const createUser = async (user: any) => {}