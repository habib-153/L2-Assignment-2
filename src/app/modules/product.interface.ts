export type TVariant = {
    type: string;
    value: string;
}

export type TInventory ={
    quantity: number;
    inStock: boolean;
}

export type TProduct ={
    name: string;
    description: string;
    price: string;
    category: string;
    tags: string[];
    variants: [TVariant];
    inventory: TInventory
}