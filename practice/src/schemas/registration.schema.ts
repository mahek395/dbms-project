import { z } from "zod"

export const registrationSchema = z.object({
    full_name: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().regex(/^\d+$/, "Digits only").min(10, "Phone must be at least 10 digits"),
    profile_photo: z
        .instanceof(File)
        .refine((f) => f.size <= 5 * 1024 * 1024, "Max 5MB")
        .refine((f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type), "JPEG, PNG or WEBP only")
        .optional()
        .nullable(),
    course_category: z.string().min(1, "Course category is required"),
    preferred_batch: z.enum(["Morning", "Evening", "Weekend"], "Select a batch"),
    start_date: z.date("Start date is required"),
    prior_experience: z.string().optional(),
    years_of_experience: z.coerce.number().min(0, "Cannot be negative"),
    placement_assistance: z.boolean(),
    agree_terms: z.boolean().refine((v) => v === true, "You must agree to the terms"),
})

// One schema per step, built by picking fields out of the full schema —
// this is what each step's react-hook-form instance actually validates against.
export const step1Schema = registrationSchema.pick({ full_name: true, email: true, phone: true })
export const step2Schema = registrationSchema.pick({
    profile_photo: true, course_category: true, preferred_batch: true,
    start_date: true, prior_experience: true, years_of_experience: true,
})
export const step3Schema = registrationSchema.pick({ placement_assistance: true, agree_terms: true })
export type RegistrationFormData = z.infer<typeof registrationSchema>