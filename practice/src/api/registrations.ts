import { api } from "@/api/axios"
import type { RegistrationFormData } from "@/schemas/registration.schema"

function buildFormData(data: Partial<RegistrationFormData>) {
  const fd = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    if (value instanceof File) fd.append(key, value)
    else if (value instanceof Date) fd.append(key, value.toISOString().slice(0, 10)) 
    else fd.append(key, String(value))
  })
  return fd
}

export const getRegistrations = async () => (await api.get("/registrations")).data
export const getRegistration = async (id: string) => (await api.get(`/registrations/${id}`)).data
export const createRegistration = async (data: Partial<RegistrationFormData>) =>
  (await api.post("/registrations", buildFormData(data), { headers: { "Content-Type": "multipart/form-data" } })).data
export const updateRegistration = async (id: string, data: Partial<RegistrationFormData>) =>
  (await api.put(`/registrations/${id}`, buildFormData(data), { headers: { "Content-Type": "multipart/form-data" } })).data
export const deleteRegistration = async (id: string) => (await api.delete(`/registrations/${id}`)).data
