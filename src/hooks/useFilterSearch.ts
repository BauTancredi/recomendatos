import { useMemo } from "react";
import { Provincia, Municipio } from "@/interfaces/location";

type Item = Provincia | Municipio;

const useFilterSearch = (items: Item[] | undefined, search: string) => {
  return useMemo(() => {
    if (!items) return [];

    return items.filter((item) => item.nombre.toLowerCase().includes(search.toLowerCase()));
  }, [items, search]);
};

export default useFilterSearch;
