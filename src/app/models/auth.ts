export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface LoginResponse {
    Email: string;
    Token: string;
}

export interface RegisterResponse {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    is_active: boolean;
}

export interface LogoutResponse {
    successMsg: string;
}