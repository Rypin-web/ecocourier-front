import { createFileRoute } from '@tanstack/react-router'
import {Users} from "@/pages/admin/Users.tsx";

export const Route = createFileRoute('/admin/users')({
  component: () => <Users />,
})