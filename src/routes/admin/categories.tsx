import {createFileRoute} from "@tanstack/react-router";
import {Categories} from "@/pages/admin/Categories.tsx";

export const Route = createFileRoute("/admin/categories")({
  component: () => (
    <Categories />
  ),
})