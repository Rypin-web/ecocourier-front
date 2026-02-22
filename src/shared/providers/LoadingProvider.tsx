import type {ReactElement} from "react";
import {useRouterState} from "@tanstack/react-router";
import {LoadingScreen} from "@/shared/ui/LoadingScreen.tsx";

export function LoadingProvider({children, path}: { children: ReactElement, path: string[] }) {
  const isLoading = useRouterState({
    select: state => state.isLoading && path.includes(state.location.pathname)
  })

  if (isLoading) return <LoadingScreen />
  return children
}