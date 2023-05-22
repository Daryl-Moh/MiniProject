import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapOptions!: google.maps.MapOptions;
  markerOptions!: google.maps.MarkerOptions;

  ngOnInit(): void {
    this.mapOptions = {
      center: { lat: 1.292056, lng: 103.776512 }, // Set the initial map center
      zoom: 15 // Set the initial zoom level
    }
    this.markerOptions = { 
      position: { lat: 1.292056, lng: 103.776512 },
      animation: google.maps.Animation.BOUNCE
    }
  }
}
