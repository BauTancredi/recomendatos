export interface Option {
  id: string;
  title: string;
  children?: Option[];
}

export interface SelectedCombo {
  zona: Option | null;
  localidad: Option | null;
}
