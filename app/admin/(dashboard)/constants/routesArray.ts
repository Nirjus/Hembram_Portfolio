import { Brain, HeartHandshake, LayoutDashboard, Shapes, User2 } from "lucide-react"

const routesArray = [
    {
        route: "/admin/dashboard",
        icon: LayoutDashboard,
        itemName: "Dashboard"
    },
    {
        route: "/admin/profile",
        icon: User2,
        itemName: "Profile"
    },
    {
        route: "/admin/project",
        icon: Shapes,
        itemName: "Project"
    },
    {
        route: "/admin/skills",
        icon: Brain,
        itemName: "Skills"
    },
    {
        route: "/admin/services",
        icon: HeartHandshake,
        itemName: "Services"
    },
]

export default routesArray