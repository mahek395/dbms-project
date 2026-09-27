import { useEffect } from "react"
import { useRegistrationFormStore } from "@/store/registrationFormStore"
import { z } from "zod"
import { step3Schema } from "@/schemas/registration.schema"
import { useForm, Controller } from "react-hook-form"
import { Field, FieldError, FieldLabel, FieldGroup } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { useEditHydration } from "@/hooks/useEditHydration"
import { useCreateRegistration, useUpdateRegistration } from "@/hooks/useRegistrations"

type Step3Data = z.infer<typeof step3Schema>

export default function RegisterStep3() {
  const navigate = useNavigate()
  const { data, updateData, reset } = useRegistrationFormStore()
  const { id, isEditing, isLoading } = useEditHydration()
  const createMutation = useCreateRegistration()
  const updateMutation = useUpdateRegistration()

  const form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      placement_assistance: data.placement_assistance ?? false,
      agree_terms: data.agree_terms ?? false,
    },
  })

  useEffect(() => {
    form.reset({
      placement_assistance: data.placement_assistance ?? false,
      agree_terms: data.agree_terms ?? false,
    })
  }, [data.placement_assistance, data.agree_terms])   

  function onSubmit(values: Step3Data) {
    updateData(values)
    const fullData = { ...data, ...values }

    if (isEditing && id) {
      updateMutation.mutate({ id, data: fullData }, {
        onSuccess: () => { reset(); navigate("/registrations") },
      })
    } else {
      createMutation.mutate(fullData, {
        onSuccess: () => { reset(); navigate("/registrations") },
      })
    }
  }

  if (isLoading) return <p>Loading registration...</p>

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6 max-w-md">
      <FieldGroup>
        <Controller
          name="placement_assistance"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              orientation="horizontal"
              className="flex items-center justify-between"
            >
              <FieldLabel>Placement Assistance</FieldLabel>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="agree_terms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="agree_terms" />
                <FieldLabel htmlFor="agree_terms">
                  I agree to the terms and conditions *
                </FieldLabel>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit">Submit</Button>
    </form>
  )
}