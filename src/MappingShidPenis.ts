/**
 * Written by Renz Christen Yeomer A. Pagulayan
 */
// @ts-ignore 
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";


import Mapbox from "mapbox-gl";
import DirectionClient from "@mapbox/mapbox-sdk/services/directions";
import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import { getLocation } from "./utils";

// @ts-ignore
Mapbox.workerClass = MapboxWorker; 
Mapbox.accessToken = 'pk.eyJ1IjoibGFyb25nYmluZ28iLCJhIjoiY2txZGU0ZXM5MGtyeTJ2bnppOHN3b3R2eSJ9.rrO7005dsxNQTb-Cl_8GAQ';
let directionClient = DirectionClient({
  accessToken: Mapbox.accessToken,
});

const pansol: Coordinates = [121.1840, 14.1784];

(async function () {
  const map = new Mapbox.Map({
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: pansol, // starting position [lng, lat]
    zoom: 15 // starting zoom
  });

  var nav = new Mapbox.NavigationControl();
  map.addControl(nav, 'top-left');

  var currentPositionMarker = new Mapbox.Marker({
    color: "#000",
    draggable: false,
  });

  // get current location via GeoLocation Browser APIs
  var coords: GeolocationPosition | null = null;
  if (navigator.geolocation) {
    var location = await getLocation();
    coords = location;
    console.log(location);
    currentPositionMarker.setLngLat([location.coords.longitude, location.coords.latitude]);
    currentPositionMarker.addTo(map);
  }

  // Pansol Marker
  new Mapbox.Marker({
    color: "#FFF",
    draggable: true,
  })
  .setLngLat(pansol)
  .addTo(map);

  map.on("load", () => {
    directionClient.getDirections({
      profile: "driving",
      geometries: "geojson",
      overview: "full",
      waypoints: [
        {
          coordinates: [coords!.coords.longitude, coords!.coords.latitude]
        },
        {
          coordinates: pansol
        }
      ]
    })
    .send()
    .then(res => {
      console.log(res);
      
      // Setup geojson shit to be able to add to the fcking map
      var geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: res.body.routes[0].geometry.coordinates
        }
      };
      console.log(res.body.routes[0].geometry.coordinates)
      
      // Add the geometry to the fcking map so that they can choke on it
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: "geojson",

          //@ts-ignore
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      })
    });
  });
})();

/**
 * Written by Renz Christen Yeomer A. Pagulayan
 */

