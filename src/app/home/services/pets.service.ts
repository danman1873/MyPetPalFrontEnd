import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pets } from '../models/Pets';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http: HttpClient) { }

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getSelectedPets(params){
    return this.http.get<Pets[]>(
      `${environment.baseApiUrl}/pet${params}`);
  }

  createPet(name: string, weight: number, type: string, feedingTime: Date){
    return this.http.post<Pets>(`${environment.baseApiUrl}/pet`, { name, weight, type, feedingTime}, this.httpOptions
    ).pipe(take(1));
  }

  updatePet(petId: number, name: string, weight: number, type: string, feedingTime: Date){
    return this.http.put(`${environment.baseApiUrl}/pet/${petId}`, { name, weight, type, feedingTime}, this.httpOptions
    ).pipe(take(1));
  }

  deletePet(petId: number) {
    return this.http.delete(`${environment.baseApiUrl}/pet/${petId}`
    ).pipe(take(1));
  }

}




