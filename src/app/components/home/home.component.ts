import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { SimulationService } from '../../services/simulation.service';
import { Airport } from '../../interfaces/airport';
import { Coordinates } from '../../interfaces/coordinates';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  validation : boolean = false;

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

  velocidad: number = 1;

  constructor( private router: Router,
               private databaseService: DatabaseService,
               private simulationService: SimulationService ) { }

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

    this.validation = false;
  }

  paisDestinoSelected(pais_destino) {
    this.databaseService.getAirports(pais_destino).subscribe( aeropuertos => {
        this.aeropuertos_destino = aeropuertos;
    });

    this.validation = false;
  }

  aeroOrigenSelected(aero_id) {
    this.aero_origen = this.aeropuertos_origen.filter(x => x.airport_id === aero_id)[0];

    this.validation = this.aero_origen.airport_id != this.aero_destino.airport_id;
  }

  aeroDestinoSelected(aero_id) {
    this.aero_destino = this.aeropuertos_destino.filter(x => x.airport_id === aero_id)[0];

    this.validation = this.aero_origen.airport_id != this.aero_destino.airport_id;
  }

  iniciarSimulacion(form) {

    var coordinates: Coordinates = {
      lat1: this.aero_origen.latitude,
      lon1: this.aero_origen.longitude,
      lat2: this.aero_destino.latitude,
      lon2: this.aero_destino.longitude,
      mach: this.velocidad
    }

    this.simulationService.startSimulation(coordinates).subscribe( res => {

      console.log(this.aero_origen.name);
      console.log(this.aero_destino.name);

      sessionStorage.setItem('origen', JSON.stringify(this.aero_origen));
      sessionStorage.setItem('destino', JSON.stringify(this.aero_destino));

      this.router.navigate(['/dashboard']);

    });

  }

}
