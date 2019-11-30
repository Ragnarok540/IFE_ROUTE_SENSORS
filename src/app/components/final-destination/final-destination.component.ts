import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-destination',
  templateUrl: './final-destination.component.html',
  styleUrls: ['./final-destination.component.css']
})
export class FinalDestinationComponent implements OnInit {

  origen;
  destino;

  constructor() { }

  ngOnInit() {
  
    var origen_str = sessionStorage.getItem("origen");
    var destino_str = sessionStorage.getItem("destino");
  
    this.origen = JSON.parse(origen_str)
    this.destino = JSON.parse(destino_str)
  
  }

}
