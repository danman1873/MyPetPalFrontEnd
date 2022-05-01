import { User } from "src/app/auth/models/user.model";



export interface Appointment {
    id: number;
    date: Date;
    description: string;
    petName: string;
    author: User;

}