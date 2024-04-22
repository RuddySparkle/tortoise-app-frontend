export interface IPetProfile {
    id: string;
    name: string;
    price: number;
    category: string;
    media: string;
    seller_id: string;
    seller_name: string;
    seller_surname: string;
}

export interface IPetDetail {
    id: string;
    name: string;
    age: number;
    price: number;
    is_sold: boolean;
    description: string;
    weight: number;
    sex: string;
    species: string;
    category: string;
    behavior: string;
    media: string;
    medical_records: MedicalRecord[];
    seller_id: string;
}

export interface IPetFilter {
    category?: string;
    sex?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface IPetUpdatePayload {
    name: string;
    age: number;
    price: number;
    is_sold: boolean;
    description: string;
    weight: number;
    sex: string;
    species: string;
    category: string;
    behavior: string;
    media?: string;
    medical_records: MedicalRecord[];
}

export interface IPetQueryParams {
    petId: string;
}

export interface IPetUpdateParams {
    petId: string;
    payload: IPetUpdatePayload;
}

export interface IPetCreateParams {
    sellerId: string;
    payload: IPetUpdatePayload;
}

export interface MedicalRecord {
    medical_id: string;
    medical_date: string;
    description: string;
}

export interface PetSearchParams {
    category: string;
    species: string;
    sex: string;
    behavior: string;
    minAge: string;
    maxAge: string;
    minWeight: string;
    maxWeight: string;
    minPrice: string;
    maxPrice: string;
}
export interface Pagination {
    total: number;
    limit: number;
    page: number;
    has_more: boolean;
}
