import Mapbox from "mapbox-gl";

// Mapbox APIs Access Token
Mapbox.accessToken = 'pk.eyJ1IjoibGFyb25nYmluZ28iLCJhIjoiY2txZGU0ZXM5MGtyeTJ2bnppOHN3b3R2eSJ9.rrO7005dsxNQTb-Cl_8GAQ';

export const MapboxInstance = new Mapbox.Map({
  container: 'map-container', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  attributionControl: false,
  zoom: 15 // starting zoom
});

var nav = new Mapbox.NavigationControl();
MapboxInstance.addControl(nav, 'top-left');

var customAttribution = new Mapbox.AttributionControl({
  customAttribution: "App written by Renz Pagulayan and Angelito Borinaga",
});
MapboxInstance.addControl(customAttribution);
