import { WeatherData } from "../services/weather";

export const FISHING_SPOTS = [
  {
    id: "1",
    name: "Oak Creek Fishing Spot",
    lat: 33.6478,
    lon: -117.832,
  },
  {
    id: "2",
    name: "Quail Hill Pond",
    lat: 33.6505,
    lon: -117.8352,
  },
  {
    id: "3",
    name: "San Joaquin Marsh",
    lat: 33.6629,
    lon: -117.8511,
  },
  {
    id: "4",
    name: "Woodbridge Lake",
    lat: 33.6784,
    lon: -117.813,
  },
  {
    id: "5",
    name: "Lower Peters Canyon Reservoir",
    lat: 33.7145,
    lon: -117.7784,
  },
  {
    id: "6",
    name: "Laguna Canyon Creek",
    lat: 33.5963,
    lon: -117.7688,
  },
  {
    id: "7",
    name: "Crystal Cove Park Fishing Area",
    lat: 33.5691,
    lon: -117.8241,
  },
  {
    id: "8",
    name: "Irvine Regional Lake",
    lat: 33.7411,
    lon: -117.7595,
  },
  {
    id: "9",
    name: "North Lake",
    lat: 33.6856,
    lon: -117.8055,
  },
  {
    id: "10",
    name: "University Park Pond",
    lat: 33.6425,
    lon: -117.8265,
  },
];

export const SPOT_IMAGES: Record<string, string> = {
  "Oak Creek Fishing Spot": "https://source.unsplash.com/600x400/?lake,forest",
  "Quail Hill Pond": "https://source.unsplash.com/600x400/?pond,trees",
  "San Joaquin Marsh": "https://source.unsplash.com/600x400/?marsh,wetlands",
  "Woodbridge Lake": "https://source.unsplash.com/600x400/?lake,california",
  "Lower Peters Canyon Reservoir": "https://source.unsplash.com/600x400/?reservoir,california",
  "Laguna Canyon Creek": "https://source.unsplash.com/600x400/?stream,creek",
  "Crystal Cove Park Fishing Area": "https://source.unsplash.com/600x400/?beach,ocean",
  "Irvine Regional Lake": "https://source.unsplash.com/600x400/?lake,irvine",
  "North Lake": "https://source.unsplash.com/600x400/?fishing,lake",
  "University Park Pond": "https://source.unsplash.com/600x400/?pond,fishing",
};

// TODO: Images don't work in the app, need to find a way to load them
