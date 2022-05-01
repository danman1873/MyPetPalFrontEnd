import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/AppointmentInterface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) { }

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getSelectedAppointment(params){
    return this.http.get<Appointment[]>(
      `${environment.baseApiUrl}/appointment${params}`);
  }

  createAppointment(date: Date, description: String, petName: string){
    return this.http.post<Appointment>(`${environment.baseApiUrl}/appointment`, { date, description, petName }, this.httpOptions
    ).pipe(take(1));
  }

  updateAppointment(appointmentId: number, date: Date, description: string, petName: string){
    return this.http.put(`${environment.baseApiUrl}/appointment/${appointmentId}`, { date, description, petName }, this.httpOptions
    ).pipe(take(1));
  }

  deleteAppointment(appointmentId: number) {
    return this.http.delete(`${environment.baseApiUrl}/appointment/${appointmentId}`
    ).pipe(take(1));
  }
  
}
