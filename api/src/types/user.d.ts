export interface IUser {
    id: string;
    displayName: string;
    email: string;
    profileUrl: string;
    image: string;
}

export interface IUserCreate {
    displayName: string;
    email: string;
    profileUrl: string;
    image: string;
}