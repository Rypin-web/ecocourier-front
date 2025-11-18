import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {UserProvider} from "@/shared/providers/userProvider.tsx";

const queryClient = new QueryClient()
const router = createRouter({
    routeTree,
    context: {
        queryClient
    }
})

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </QueryClientProvider>
    )
}

export default App
