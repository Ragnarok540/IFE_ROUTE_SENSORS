import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paises_origen: string[];
  paises_destino: string[];

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

}
