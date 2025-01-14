export const authMiddleware = async (token: string) => { 
    console.log("Auth middleware called with token: ", token);
}