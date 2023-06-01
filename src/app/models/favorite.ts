export interface Favorite {
    id: number
    id_user: number
    character_name_favorite: string
    created_at: string
    updated_at: string
}

interface SimpleResponse {
    message: string;
}

export interface AddFavoriteResponse extends SimpleResponse {
}

export interface DeleteFavoriteResponse extends SimpleResponse {
}

interface SimpleRequest {
    character_name_favorite: string;
}

export interface AddFavoriteRequest extends SimpleRequest {
}

export interface DeleteFavoriteRequest extends SimpleRequest {
}