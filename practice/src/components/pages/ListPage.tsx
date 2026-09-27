import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { useRegistrations, useDeleteRegistration } from "@/hooks/useRegistrations"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// matches the shape your GET /api/registrations rows actually have
type Registration = {
  id: number
  full_name: string
  email: string
  phone: string
  profile_photo: string | null
  course_category: string
  preferred_batch: string
  start_date: string
  prior_experience: string | null
  years_of_experience: number
  placement_assistance: number // 0/1 from MySQL TINYINT
  agree_terms: number
}

export default function ListPage() {
  const navigate = useNavigate()
  const { data: registrations, isLoading, isError } = useRegistrations()
  const deleteMutation = useDeleteRegistration()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  if (isLoading) return <p>Loading registrations...</p>
  if (isError) return <p className="text-destructive">Failed to load registrations.</p>

  function handleDelete(id: number) {
    setDeletingId(id)
    deleteMutation.mutate(String(id), {
      onSettled: () => setDeletingId(null),
    })
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Prior Experience</TableHead>
            <TableHead>Placement</TableHead>
            <TableHead>Agreed</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {registrations.map((r: Registration) => (
            <TableRow key={r.id}>
              <TableCell>
                {r.profile_photo ? (
                  <img
                    src={`http://localhost:5000/uploads/${r.profile_photo}`}
                    alt={r.full_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </TableCell>
              <TableCell className="font-medium">{r.full_name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.phone}</TableCell>
              <TableCell>{r.course_category}</TableCell>
              <TableCell>{r.preferred_batch}</TableCell>
              <TableCell>{format(new Date(r.start_date), "PPP")}</TableCell>
              <TableCell>{r.years_of_experience} yrs</TableCell>

              {/* truncated visually, full text still available via the title attribute on hover */}
              <TableCell className="max-w-[160px] truncate" title={r.prior_experience ?? ""}>
                {r.prior_experience || "—"}
              </TableCell>

              <TableCell>
                <Badge variant={r.placement_assistance ? "default" : "secondary"}>
                  {r.placement_assistance ? "Yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={r.agree_terms ? "default" : "secondary"}>
                  {r.agree_terms ? "Yes" : "No"}
                </Badge>
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/register/${r.id}/step1`)}
                >
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger
                    render={<Button size="sm" variant="destructive">Delete</Button>}
                  />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this registration?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete {r.full_name}'s registration. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(r.id)}
                        disabled={deletingId === r.id}
                      >
                        {deletingId === r.id ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}

          {registrations.length === 0 && (
            <TableRow>
              <TableCell colSpan={12} className="text-center text-muted-foreground py-8">
                No registrations yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}