import { User } from "src/app/auth/models/user.model";

export interface Pets {
    id: number;
    name: string;
    weight: number;
    type: string;
    feedingTime: Date;
    author: User;
}