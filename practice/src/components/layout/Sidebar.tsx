import { NavLink, useLocation } from "react-router-dom"

export default function Sidebar() {
  const location = useLocation()                      
  const isRegisterActive = location.pathname.startsWith("/register")

  const baseClass = "block px-4 py-2 rounded-md text-sm"
  const activeClass = "bg-primary text-primary-foreground"
  const inactiveClass = "hover:bg-muted"

  return (
    <aside className="w-56 border-r p-4 space-y-2">
      <NavLink
        to="/registrations"
        className={({ isActive }) =>                 
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        All Registrations
      </NavLink>

      <NavLink
        to="/register/step1"
        className={`${baseClass} ${isRegisterActive ? activeClass : inactiveClass}`}  
      >
        New Registration
      </NavLink>
    </aside>
  )
}