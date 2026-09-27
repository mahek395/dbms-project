import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRegistration } from "./useRegistrations"
import { useRegistrationFormStore } from "@/store/registrationFormStore"

function normalizeFetchedRecord(fetched: any) {
  return {
    ...fetched,
    start_date: fetched.start_date ? new Date(fetched.start_date) : undefined,
    placement_assistance: Boolean(fetched.placement_assistance),
    agree_terms: Boolean(fetched.agree_terms),
  }
}

export function useEditHydration() {
  const { id } = useParams<{ id?: string }>()
  const { editId, setEditId, updateData, reset } = useRegistrationFormStore()
  const { data: fetched, isLoading } = useRegistration(id ?? "")

  // detect entering/leaving edit mode (or switching to a different record) — reset first, so
  // one record's data can never bleed into another
  useEffect(() => {
    if (id && id !== editId) {
      reset()
      setEditId(id)
    } else if (!id && editId) {
      reset()
    }
  }, [id])

  // once the fetch resolves for the CURRENT edit target, normalize types and push into the store
  useEffect(() => {
    if (id && fetched && editId === id) {
      updateData(normalizeFetchedRecord(fetched))
    }
  }, [fetched, editId])

  return { id, isEditing: !!id, isLoading: id ? isLoading : false }
}