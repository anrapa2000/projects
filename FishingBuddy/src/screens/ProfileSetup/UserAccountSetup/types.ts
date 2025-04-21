export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface BasicProfile {
  name: string;
  email: string;
  password: string;
  age?: number;
  location?: LocationCoordinates | null;
  photo?: string | null;
} 