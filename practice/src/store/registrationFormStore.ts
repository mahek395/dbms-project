import { create } from "zustand"
import type { RegistrationFormData } from "@/schemas/registration.schema"

interface RegistrationFormState {
  data: Partial<RegistrationFormData>
  editId: string | null
  updateData: (fields: Partial<RegistrationFormData>) => void
  setEditId: (id: string | null) => void
  reset: () => void
}

export const useRegistrationFormStore = create<RegistrationFormState>((set) => ({
  data: {},
  editId: null,
  updateData: (fields) => set((state) => ({ data: { ...state.data, ...fields } })),
  setEditId: (id) => set({ editId: id }),
  reset: () => set({ data: {}, editId: null }),
}))