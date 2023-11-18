export interface Option {
  id: number;
  name: string;
  localidades?: Option[];
}

export interface SelectedCombo {
  zona: Option | null;
  localidad: Option | null;
}
