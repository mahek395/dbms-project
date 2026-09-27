import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as api from "@/api/registrations"

export const useRegistrations = () =>
  useQuery({ queryKey: ["registrations"], queryFn: api.getRegistrations })

export const useRegistration = (id: string) =>
  useQuery({ queryKey: ["registrations", id], queryFn: () => api.getRegistration(id), enabled: !!id })

export const useCreateRegistration = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.createRegistration,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["registrations"] }),
  })
}

export const useUpdateRegistration = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateRegistration(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["registrations"] }),
  })
}

export const useDeleteRegistration = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.deleteRegistration,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["registrations"] }),
  })
}