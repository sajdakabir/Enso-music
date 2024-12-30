import { environment } from "../loaders/environment.loader";
import { fetch } from "bun";
import { IUserCreate } from "../types";
import { db } from "../db/drizzle";
import { User } from "../db/schema";
import { eq } from "drizzle-orm";

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

    const { access_token } = tokenData;

    const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
        throw new Error(`Failed to fetch user details: ${userData.error}`);
    }


    const user = {
        displayName: userData.display_name,
        email: userData.email,
        profileUrl: userData.external_urls?.spotify,
        image: userData.images?.[0]?.url || null
    };

    await createUser(user);

    return {
        status: 200,
        data: tokenData
    };
};

export const createUser = async (userData: IUserCreate) => {
    try {
        if (userData.email) {
            const me = await getUserByEmail(userData.email);
            if (me) {
                return {
                    message: "User already exists",
                    status: 400,
                    data: me
                };
            }
        }
        const newUser = await db.insert(User).values(userData);
        return newUser;
    } catch (error) {
        console.error('Error creating/updating user:', error);
        throw error;
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const me = await db.select().from(User).where(eq(User.email, email));
        if (!me) {
            return {
                message: "User not found",
                status: 404,
                data: null
            };
        }
        return {
            status: 200,
            data: me
        };
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error
    }

}