export interface Role{
    id: string,
    title: string,
}

export interface User{
    id: string,
    username: string,    
    password: string,
    image: string,
    role: Role,
    active: boolean,
    email?: string;
    phoneNumber?: string;
    address?: string;
    birthDate?: string;
    gender?: string;
    createdAt?: string; 
    updatedAt?: string;
    socialMedia?: {
        twitter?: string;
        facebook?: string;
        instagram?: string;
    };
    money?: {
        cash?: Number;  
        silver?: Number;
        gold?: Number;
        diamond?: Number;
    };
}