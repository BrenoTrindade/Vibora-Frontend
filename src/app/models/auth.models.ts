export interface LoginQuery {
    email?: string;
    password?: string;
}

export interface RegisterUserCommand {
    name?: string;
    email?: string;
    password?: string;    
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
}