import { Appointment } from "src/app/home/models/AppointmentInterface";
import { Pets } from "src/app/home/models/Pets";

export type Role = 'admin' | 'secondary' | 'user';

export interface User {
    id: number,
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    pets: Pets[];
    appointments: Appointment[];
}