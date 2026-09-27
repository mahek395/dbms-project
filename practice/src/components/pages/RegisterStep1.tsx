import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { step1Schema } from "@/schemas/registration.schema"
import { useRegistrationFormStore } from "@/store/registrationFormStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useEditHydration } from "@/hooks/useEditHydration"
import { useEffect } from "react"

type Step1Data = z.infer<typeof step1Schema>

export default function RegisterStep1() {
  const navigate = useNavigate()
  const { data, updateData } = useRegistrationFormStore()
  const { id, isEditing, isLoading } = useEditHydration()

  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      full_name: data.full_name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
    },
  })
   useEffect(() => {
    form.reset({
      full_name: data.full_name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
    })
  }, [data.full_name, data.email, data.phone])

  function onSubmit(values: Step1Data) {
    updateData(values)
    navigate(isEditing ? `/register/${id}/step2` : "/register/step2")
  }

  if (isLoading) return <p>Loading registration...</p>

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 max-w-md"
      noValidate
    >
      <FieldGroup>

        <Controller
          name="full_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Full Name *</FieldLabel>

              <Input
                {...field}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email *</FieldLabel>

              <Input
                {...field}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Phone *</FieldLabel>

              <Input
                {...field}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

      </FieldGroup>

      <Button type="submit">
        Next
      </Button>
    </form>
  )
}