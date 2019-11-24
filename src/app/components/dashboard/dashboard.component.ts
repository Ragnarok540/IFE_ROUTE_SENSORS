import { AfterViewInit, Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SimulationService } from '../../services/simulation.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private map;

  subscription: Subscription;
  altitude;
  speed;
  ext_temp;
  int_temp;
  time_current;
  time_remaining;
  location;
  marker;

  constructor( private simulationService: SimulationService ) { }

  ngAfterViewInit(): void {
    this.initMap();
  
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 0, 0 ],
      zoom: 1
    });

  

  }

  ngOnInit() {
    const source = interval(1000);
  
    this.subscription = source.subscribe(val => {

      this.simulationService.getAltitude().subscribe( altitude => {
        this.altitude = altitude.message;
      });
 
      this.simulationService.getSpeed().subscribe( speed => {
        this.speed = speed.message;
      });

      this.simulationService.getExternalTemp().subscribe( temp => {
        this.ext_temp = temp.message;
      });

      this.simulationService.getInternalTemp().subscribe( temp => {
        this.int_temp = temp.message;
      });

      this.simulationService.getCurrentTime().subscribe( time => {
        this.time_current = this.secondsToString(time.message);
      });

      this.simulationService.getRemainingTime().subscribe( time => {
        this.time_remaining = this.secondsToString(time.message);
      });

      this.simulationService.getLocation().subscribe( location => {
        this.marker = L.marker([location.message[0], location.message[1]]).addTo(this.map);
        this.map.panTo([location.message[0], location.message[1]])
      });

    });
  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  secondsToString( seconds: string ) {
    var num = parseFloat(seconds);
    var hour = num / 3600;
    var min = (hour % 1) * 60;
    var sec = (min % 1) * 60;
    return `${Math.floor(hour)} h ${Math.floor(min)} m ${Math.floor(sec)} s`
  }

}
