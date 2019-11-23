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
  
  //aero_origen: string;
  //aero_destino: string;
  
  aeropuertos_origen: Airport[];
  aeropuertos_destino: Airport[];

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

}
