import { CartItem } from "./CartItem";

export interface Cart {
    userId: string;
    cartItems: CartItem[];
}