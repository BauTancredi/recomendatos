export interface Option {
  id: string;
  title: string;
  children?: Option[];
}

export interface SelectedCombo {
  zona: Option | null;
  localidad: Option | null;
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
