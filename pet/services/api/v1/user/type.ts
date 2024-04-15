export interface IUserDetail {
    _id: any;
    username: string;
    first_name: string;
    last_name: string;
    gender: string;
    phoneNumber: string;
    image?: string;
    address: Address;
}

export interface Address {
    houseNumber: string;
    building: string;
    street: string;
    district: string;
    subdistrict: string;
    province: string;
    postalCode: string;
}

export interface IChangePassword {
    old_password: string;
    password: string;
}

export interface IChangePasswordParams {
    user_id: string;
    payload: IChangePassword;
}

export interface IUserUpdateParams {
    user_id: string;
    payload: IUserUpdatePayload;
}
export interface IUserUpdatePayload {
    username: string;
    first_name: string;
    last_name: string;
    gender: string;
    phoneNumber: string;
    image: string;
    address: Address;
}
