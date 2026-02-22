import {ThemeProvider} from "@/shared/providers/ThemeProvider.tsx";
import {Header} from "@/widgets/Header.tsx";
import {useUserContext} from "@/shared/providers/UserProvider.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {Outlet} from "@tanstack/react-router";
import {useEffect} from "react";
import {useGetMe} from "@/shared/hooks/useUserService.ts";
import {WeUseCookie} from "@/features/WeUseCookie.tsx";

export function Root() {
  const {setUser} = useUserContext()
  const {data} = useGetMe()

  useEffect(() => {
    if (data?.data.msg) setUser(data.data.user)
  }, [data])

  return (
    <ThemeProvider>
      <Toaster position={"bottom-left"} />
      <Header />
      <main className='mt-[50px]'>
        <Outlet />
      </main>
      <WeUseCookie />
      {/*<TanStackRouterDevtools />*/}
    </ThemeProvider>
  )
}