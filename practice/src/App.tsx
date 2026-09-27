import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import ListPage from "@/components/pages/ListPage"
import RegisterStep1 from "@/components/pages/RegisterStep1"
import RegisterStep2 from "@/components/pages/RegisterStep2"
import RegisterStep3 from "@/components/pages/RegisterStep3"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/registrations" replace />} />
        <Route path="/registrations" element={<ListPage />} />
        <Route path="/register/step1" element={<RegisterStep1 />} />
        <Route path="/register/step2" element={<RegisterStep2 />} />
        <Route path="/register/step3" element={<RegisterStep3 />} />
        <Route path="/register/:id/step1" element={<RegisterStep1 />} />
        <Route path="/register/:id/step2" element={<RegisterStep2 />} />
        <Route path="/register/:id/step3" element={<RegisterStep3 />} />
      </Route>
    </Routes>
  )
}