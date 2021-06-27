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
import { Locations } from "./FckingShidAssFckShid";
import { MapboxInstance } from "./FckingMapboxFckingInstance";

// @ts-ignore
Mapbox.workerClass = MapboxWorker;

// Mapbox APIs Access Token
Mapbox.accessToken = 'pk.eyJ1IjoibGFyb25nYmluZ28iLCJhIjoiY2txZGU0ZXM5MGtyeTJ2bnppOHN3b3R2eSJ9.rrO7005dsxNQTb-Cl_8GAQ';

// Mapbox Navigation APIs CLient
let directionClient = DirectionClient({
  accessToken: Mapbox.accessToken,
});

// General location of Pansol
const pansol: Coordinates = [121.1840, 14.1784];

(async function () {
  const map = MapboxInstance;

  map.setCenter(pansol);

  var currentPositionMarker = new Mapbox.Marker({
    color: "#000",
    draggable: true,
  });

  // get current location via GeoLocation Browser APIs
  var currentCoord: Coordinates | null = null;
  try {
    var location = await getLocation();
    currentCoord = [location.coords.longitude, location.coords.latitude];
    console.log(currentCoord)
  }
  catch{
    currentCoord = [120.98423680055872,14.535233738621923];
  }

  currentPositionMarker.setLngLat(currentCoord);
  currentPositionMarker.addTo(map);

  // Pansol Marker
  new Mapbox.Marker({
    color: "#FFF",
    draggable: true,
  })
    .setLngLat(pansol)
    .addTo(map);

  map.on("load", async () => {
    // Resort marker
    Locations.forEach(async location => {

      console.log(location);
      new Mapbox.Marker({
        color: "#080",
        draggable: false
      })
        .setLngLat(location.coordinates)
        .addTo(map);
  
      let resortGeo = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: await GenerateRouteFrom2Coordinates(pansol, location.coordinates)
        }
      };

      map.addLayer({
        id: location.name + '_route',
        type: 'line',
        source: {
          type: "geojson",
  
          //@ts-ignore
          data: resortGeo
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

    // Setup geojson shit to be able to add to the fcking map
    var geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: await GenerateRouteFrom2Coordinates(currentCoord!, pansol)
      }
    };

    var currentRouteLayer = {
      id: 'currentRouteLayer',
      type: 'line',
      source: "currentRouteSource",
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    };

    map.addSource("currentRouteSource", {
      type: "geojson",
      // @ts-ignore
      data: geojson
    });

    // Add the geometry to the fcking map so that they can choke on it
    //@ts-ignore
    map.addLayer(currentRouteLayer);
    

    currentPositionMarker.on("dragend", async (e: any) => {
      console.log(e.target._lngLat);
      map.removeLayer('currentRouteLayer');
      map.removeSource("currentRouteSource");
      let newRoute = await GenerateRouteFrom2Coordinates([e.target._lngLat.lng, e.target._lngLat.lat] as Coordinates, pansol);
      geojson.geometry.coordinates = newRoute;
      //@ts-ignore
      map.addSource("currentRouteSource", {
        type: "geojson",
        // @ts-ignore
        data: geojson
      });
      //@ts-ignore
      map.addLayer(currentRouteLayer);

    });
  });

  
})();

async function GenerateRouteFrom2Coordinates(startCoord: Coordinates, endCoord: Coordinates) {
  let res = await directionClient.getDirections({
    profile: "driving",
    geometries: "geojson",
    overview: "full",
    waypoints: [
      { coordinates: startCoord },
      { coordinates: endCoord }
    ]
  }).send();
  return res.body.routes[0].geometry.coordinates;
}

/**
 * Written by Renz Christen Yeomer A. Pagulayan
 */

