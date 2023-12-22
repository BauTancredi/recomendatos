import { useQuery } from "react-query";
import { Municipio, Provincia } from "@/interfaces/location";

const fetchProvincias = async () => {
  const res = await fetch("https://apis.datos.gob.ar/georef/api/provincias");

  const { provincias } = await res.json();

  // order alphabetically, put CABA first
  provincias.sort((a: Provincia, b: Provincia) => {
    if (a.nombre === "Ciudad Autónoma de Buenos Aires") return -1;
    if (b.nombre === "Ciudad Autónoma de Buenos Aires") return 1;

    if (a.nombre > b.nombre) return 1;
    if (a.nombre < b.nombre) return -1;

    return 0;
  });

  // Change Tierra del Fuego, Antártida e Islas del Atlántico Sur to Tierra del Fuego

  return provincias;
};

const fetchMunicipios = async (id?: string) => {
  if (!id) {
    return []; // Return an empty array or some default value when provinciaId is undefined
  }

  const res = await fetch(
    `https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&max=1000`
  );

  const { municipios } = await res.json();

  municipios.sort((a: Municipio, b: Municipio) => {
    if (a.nombre > b.nombre) return 1;
    if (a.nombre < b.nombre) return -1;

    return 0;
  });

  return municipios;
};

const fetchLocalidades = async (id?: string) => {
  //apis.datos.gob.ar/georef/api/localidades?provincia=02&max=135&campos=nombre,id,centroide
  if (!id) {
    return []; // Return an empty array or some default value when provinciaId is undefined
  }

  const res = await fetch(
    `https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}&campos=nombre,id,centroide&max=135`
  );

  const { localidades } = await res.json();

  localidades.sort((a: Municipio, b: Municipio) => {
    if (a.nombre > b.nombre) return 1;
    if (a.nombre < b.nombre) return -1;

    return 0;
  });

  return localidades;
};

// Define the custom hook
const useProvinciasAndMunicipios = (selectedProvincia: Provincia | null) => {
  const { data: provincias, isLoading: isProvinciasLoading } = useQuery(
    "provincias",
    fetchProvincias
  );

  const { data: municipios, isLoading: isMunicipiosLoading } = useQuery(
    ["municipios", selectedProvincia?.id],
    () => fetchMunicipios(selectedProvincia?.id),
    {
      enabled: !!selectedProvincia, // The query will only run if provincia is not null
    }
  );

  const { data: localidades, isLoading: isLocalidadesLoading } = useQuery(
    ["localidades", selectedProvincia?.id],
    () => fetchLocalidades(selectedProvincia?.id),
    {
      enabled: !!selectedProvincia, // The query will only run if provincia is not null
    }
  );

  return {
    provincias,
    isProvinciasLoading,
    municipios,
    isMunicipiosLoading,
    localidades,
    isLocalidadesLoading,
  };
};

export default useProvinciasAndMunicipios;
