import { create } from "zustand";

interface Address {
  location: {
    lat: number | undefined;
    lng: number | undefined;
  };
  description: string;
}

interface ProviderStore {
  type: string;
  setType: (type: string) => void;
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
}

export const useProviderStore = create<ProviderStore>((set) => ({
  type: "",
  setType: (type: string) => set({ type }),
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
}));
