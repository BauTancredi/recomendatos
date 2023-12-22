import { create } from "zustand";
import { Address, Municipio, Provincia } from "@/interfaces/location";

interface OnboardingStore {
  type: "user" | "provider" | "";
  setType: (type: "user" | "provider") => void;
  providerType: "professional" | "shop" | "";
  setProviderType: (type: "professional" | "shop") => void;
  jobs: string[];
  addJob: (job: string) => void;
  removeJob: (job: string) => void;
  address: Address;
  setAddress: (address: Address) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  provincia: Provincia | null;
  setProvincia: (provincia: Provincia | null) => void;
  municipios: Municipio[];
  setMunicipios: (municipios: Municipio[]) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  type: "",
  setType: (type: "user" | "provider") => set({ type }),
  providerType: "",
  setProviderType: (providerType: "professional" | "shop") => set({ providerType }),
  jobs: [],
  addJob: (job: string) => set((state) => ({ jobs: [...state.jobs, job] })),
  removeJob: (job: string) => set((state) => ({ jobs: state.jobs.filter((j) => j !== job) })),
  address: {
    location: {
      lat: 0,
      lng: 0,
    },
    description: "",
  },
  setAddress: (address: Address) => set({ address }),
  phone: "",
  setPhone: (phone: string) => set({ phone }),
  email: "",
  setEmail: (email: string) => set({ email }),
  bio: "",
  setBio: (bio: string) => set({ bio }),
  provincia: {
    id: "",
    nombre: "",
    centroide: {
      lat: 0,
      lon: 0,
    },
  },
  setProvincia: (provincia: Provincia | null) => set({ provincia }),
  municipios: [],
  setMunicipios: (municipios: Municipio[]) => set({ municipios }),
}));
