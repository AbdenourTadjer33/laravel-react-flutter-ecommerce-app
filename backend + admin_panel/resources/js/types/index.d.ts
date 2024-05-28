export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export type Admin = {
    id: string;
    name: string;
    email: string;
    status: boolean;
    createdAt: string;
}

export type Product = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: string;
    status: boolean;
    sizes: string[];
    images?: string[];
    brand_id?: string;
    brand?: string;
};

export type Brand = {
    id: string;
    name: string;
    logo: string;
}

export type Order = {
    ref: string;
    total: string;
    status: string;
    createdAt: string;
    client: {
        name: string;
        email: string;
        phone: string;
        address: string;
    }, 
    products: {
        slug: string;
        name: string; 
        brand: string;
        price: string;
        images: string[];
        qte: number;
        size: string;
        total: string;
    }[]
}

export interface Pagination<TData> {
    data: TData[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

type PaginationLinks = {
    first: string;
    last: string;
    next?: string;
    prev?: string;
};

type PaginationMetaLink = {
    url?: string;
    label: string;
    active: boolean;
};

type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationMetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};
