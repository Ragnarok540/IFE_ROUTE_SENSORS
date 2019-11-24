import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';
import { Airport } from '../interfaces/airport';
import { Coordinates } from '../interfaces/coordinates';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  env = environment;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http:HttpClient, 
               private error:ErrorService ) { }

  public startSimulation( coord : Coordinates ) : Observable<any> {

    return this.http.post( `${this.env.api_url}/iniciar_vuelo`, coord, this.httpOptions ).pipe(
      tap((res:Response) => console.log('Simulation started')),
      catchError(this.error.handleError<Response>('startSimulation'))
    );

  }

  public getAltitude() : Observable<any> {
    return this.http.get<any>( `${this.env.api_url}/altitud` );
  }

  public getSpeed() : Observable<any> {
    return this.http.get<any>( `${this.env.api_url}/velocidad` );
  }

  public getExternalTemp() : Observable<any> {
    return this.http.get<any>( `${this.env.api_url}/temperatura_exterior` );
  }

  public getInternalTemp() : Observable<any> {
    return this.http.get<any>( `${this.env.api_url}/temperatura_interior` );
  }

  public getRemainingTime() : Observable<any> {
    return this.http.get<any>( `${this.env.api_url}/tiempo_de_vuelo_restante` );
  }

  public getCurrentTime() : Observable<any> {
    return this.http.get<any>( `${this.env.api_url}/tiempo_de_vuelo_actual` );
  }

  public getLocation() : Observable<any> {
    return this.http.get<any>( `${this.env.api_url}/ubicacion` );
  }

}
