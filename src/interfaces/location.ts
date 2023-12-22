export interface Option {
  id: string;
  title: string;
  children?: Option[];
}

export interface Provincia {
  centroide: {
    lat: number;
    lon: number;
  };
  id: string;
  nombre: string;
}

export interface Municipio {
  centroide: {
    lat: number;
    lon: number;
  };
  id: string;
  nombre: string;
  provincia?: Provincia;
}

export interface Address {
  location: {
    lat: number | undefined;
    lng: number | undefined;
  };
  description: string;
}
