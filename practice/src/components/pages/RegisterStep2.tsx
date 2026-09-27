// src/pages/RegisterStep2.tsx
import { useState, useEffect, useRef } from "react"
import { useRegistrationFormStore } from "@/store/registrationFormStore"
import { z } from "zod"
import { step2Schema } from "@/schemas/registration.schema"
import { useForm, Controller } from "react-hook-form"
import { Field, FieldError, FieldLabel, FieldGroup } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { useEditHydration } from "@/hooks/useEditHydration"

type Step2Data = z.infer<typeof step2Schema>

export default function RegisterStep2() {
  const navigate = useNavigate()
  const { data, updateData } = useRegistrationFormStore()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { id, isEditing, isLoading } = useEditHydration()

  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      profile_photo: data.profile_photo ?? null,
      course_category: data.course_category ?? "",
      preferred_batch: data.preferred_batch ?? undefined,
      start_date: data.start_date ?? undefined,
      prior_experience: data.prior_experience ?? "",
      years_of_experience: data.years_of_experience ?? 0,
    },
  })

  // ALL hooks declared before any early return — order must be identical every render
  useEffect(() => {
    form.reset({
      profile_photo: data.profile_photo ?? null,
      course_category: data.course_category ?? "",
      preferred_batch: data.preferred_batch ?? undefined,
      start_date: data.start_date ?? undefined,
      prior_experience: data.prior_experience ?? "",
      years_of_experience: data.years_of_experience ?? 0,
    })
  }, [data.profile_photo, data.course_category, data.preferred_batch, data.start_date, data.prior_experience, data.years_of_experience])

  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    const existingFile = data.profile_photo
    if (existingFile instanceof File) {
      const url = URL.createObjectURL(existingFile)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [data.profile_photo])

  function onSubmit(values: Step2Data) {
    updateData(values)
    navigate(isEditing ? `/register/${id}/step3` : "/register/step3")
  }

  // early return now comes AFTER every hook call
  if (isLoading) return <p>Loading registration...</p>

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6 max-w-md">
      <FieldGroup>
        <Controller
          name="course_category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Course Category *</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="preferred_batch"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Preferred Batch *</FieldLabel>
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Morning" id="Morning" />
                  <Label htmlFor="Morning">Morning</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Evening" id="Evening" />
                  <Label htmlFor="Evening">Evening</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Weekend" id="Weekend" />
                  <Label htmlFor="Weekend">Weekend</Label>
                </div>
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="start_date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Start Date *</FieldLabel>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      data-empty={!field.value}
                      className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    />
                  }
                >
                  <CalendarIcon />
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={{ before: today }}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="prior_experience"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Prior Experience</FieldLabel>
              <Textarea placeholder="Tell us about your prior experience..." {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="years_of_experience"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Years of Experience</FieldLabel>
              <Input
                type="number"
                min={0}
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="profile_photo"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Profile Photo</FieldLabel>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null
                  field.onChange(file)
                  setPreview(file ? URL.createObjectURL(file) : null)
                }}
              />
              {preview && (
                <div className="flex items-center gap-3 mt-2">
                  <img src={preview} alt="Preview" className="h-20 w-20 object-cover rounded-md border" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      field.onChange(null)
                      setPreview(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit">Next</Button>
    </form>
  )
}