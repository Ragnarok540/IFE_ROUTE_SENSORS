import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Airport } from '../../interfaces/airport';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paises_origen: string[];
  paises_destino: string[];
  
  aeropuertos_origen: Airport[];
  aeropuertos_destino: Airport[];

  aero_origen: Airport = {
    airport_id: "",
    name: "",
    city: "",
    country: "",
    iata: "",
    icao: "",
    latitude: "",
    longitude: "",
    altitude: "",
    timezone: "",
    timezone_text: ""
  };

  aero_destino: Airport = {
    airport_id: "",
    name: "",
    city: "",
    country: "",
    iata: "",
    icao: "",
    latitude: "",
    longitude: "",
    altitude: "",
    timezone: "",
    timezone_text: ""
  };

  constructor( private router: Router,
               private databaseService: DatabaseService  ) { }

  ngOnInit() {

    this.databaseService.getCountries().subscribe( countries => {
        this.paises_origen = countries;
    });

    this.databaseService.getCountries().subscribe( countries => {
        this.paises_destino = countries;
    });

  }

  paisOrigenSelected(pais_origen) {
    this.databaseService.getAirports(pais_origen).subscribe( aeropuertos => {
        this.aeropuertos_origen = aeropuertos;
    });
  }

  paisDestinoSelected(pais_destino) {
    this.databaseService.getAirports(pais_destino).subscribe( aeropuertos => {
        this.aeropuertos_destino = aeropuertos;
    });
  }

  aeroOrigenSelected(aero_id) {
    this.aero_origen = this.aeropuertos_origen.filter(x => x.airport_id === aero_id)[0];
  }

  aeroDestinoSelected(aero_id) {
    this.aero_destino = this.aeropuertos_destino.filter(x => x.airport_id === aero_id)[0];
  }

  iniciarSimulacion(form) {
    console.log(this.aero_origen.name);
    console.log(this.aero_destino.name);
  }

}
