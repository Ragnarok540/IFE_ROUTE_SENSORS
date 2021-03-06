import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Airport } from '../interfaces/airport';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  env = environment;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http:HttpClient ) { }

  public getCountries() : Observable<string[]> {
    return this.http.get<string[]>( `${this.env.api_url}/paises` );
  }

  public getAirports( country : string ) : Observable<Airport[]> {
    return this.http.get<Airport[]>( `${this.env.api_url}/aeropuertos/${country}`, this.httpOptions );
  }

}
