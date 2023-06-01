export interface Login {
    email: string;
    password: string;
}

export interface Register extends CommonAttribute {
    password: string;
    password_confirmation: string;
}

export interface LoginResponse {
    data: LoginData;
    token: string;
}

export interface LoginData extends CommonAttribute {
    created_at: Date;
    email_verified_at: null;
    id: number;
    more_info: null;
    updated_at: Date;
}

export interface RegisterResponse {
    data: RegisterData;
    token: string;
}

interface RegisterData extends CommonAttribute {
    created_at: Date;
    id: number;
    updated_at: Date;
}

export interface LogoutResponse {
    message: string;
}

interface CommonAttribute {
    email: string;
    address: string;
    name: string;
    city: string;
    birthdate: Date;
}