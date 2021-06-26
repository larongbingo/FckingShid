import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";

// Need to swap coords' places
export const Locations: Location[] = [
  {
    name: "Pansol Resorts",
    coordinates: [14.178824829145595, 121.18451595571918],
  },
  {
    name: "3J's Resort",
    coordinates: [14.180354461788383, 121.18419165053093],
  },
  {
    name: "Agua Caliente Hot Spring Resort & Hotel",
    coordinates: [14.178429672369251, 121.18501994351173],
  },
  {
    name: "Cayets Cabin Private Resort",
    coordinates: [14.178803584175132, 121.1860016240816],
  },
  {
    name: "Menezes Private Pool",
    coordinates: [14.177928289662004, 121.18659326192505],
  },


  {
    name: "Birds of Paradise",
    coordinates: [14.179751988505584, 121.18803096157306],
  },
  {
    name: "Laguna Hot Spring Resort",
    coordinates: [14.179862063579426, 121.18379186357055],
  },
  {
    name: "Villa Navarro",
    coordinates: [14.180327757292478, 121.18330533669955],
  },
  {
    name: "Villa Josefina",
    coordinates: [14.181233117767949, 121.18730816478906],
  },
  {
    name: "South Star Mountainview Resort",
    coordinates: [14.181996101392789, 121.18450948017309]
  },


  {
    name: "Water Fun Resort Pansol Laguna",
    coordinates: [14.177322097198926, 121.18016319595841],
  },
  {
    name: "Villa Leah Resort",
    coordinates: [14.17782234040502, 121.18018925447443],
  },
  {
    name: "Ederlyn Resort",
    coordinates: [14.178933988023728, 121.18083550567208],
  },
  {
    name: "G3 Natural Hot Spring",
    coordinates: [14.180389227590553, 121.17817232533167],
  },
  {
    name: "172 Mutya Private Hot Springs Resort Villa",
    coordinates: [14.178135623478052, 121.18248761558692]
  },



  {
    name: "Primavera Hot Spring Resort",
    coordinates: [14.176929682010988, 121.18726982166295],
  },
  {
    name: "Sun City",
    coordinates: [14.1753192549161, 121.18935228080713],
  },
  {
    name: "Labelle Resort",
    coordinates: [14.172476943344607, 121.19148432246828],
  },
  {
    name: "Dreamwave Resort",
    coordinates: [14.18164589909594, 121.18704587648294],
  },
  {
    name: "Solemar 24 - Southern Spring Resort",
    coordinates: [14.184537382033671, 121.18436047510917]
  },



  {
    name: "Shit ass fck",
    coordinates: [14.183972550990644, 121.18405678317698]
  }
];

Locations.forEach(location => {
  let copy = [...location.coordinates];
  location.coordinates[0] = copy[1];
  location.coordinates[1] = copy[0];
});

type Location = {
  name: string;
  coordinates: Coordinates;
}