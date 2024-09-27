import { BookA, FileText, Image } from "lucide-react";

export const profilePages = [
    {
        index: 0,
        link: "/admin/profile",
        routeName: "Info",
        icon: BookA,
    },
    {
        index: 1,
        link: "/admin/profile/update-pic",
        routeName: "Pictures",
        icon: Image,
    },
    {
        index: 2,
        link: "/admin/profile/add-files",
        routeName: "links & more",
        icon: FileText,
    },
];