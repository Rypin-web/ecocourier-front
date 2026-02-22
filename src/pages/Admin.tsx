import {AdminNavigation} from "@/widgets/AdminNavigation/AdminNavigation.tsx";
import {Outlet} from "@tanstack/react-router";
import {LoadingProvider} from "@/shared/providers/LoadingProvider.tsx";

function Admin() {

  return (
    <>
      <AdminNavigation />
      <div className={'pl-[250px] pt-[70px]'}>
        <LoadingProvider path={[
          '/admin/users',
          '/admin/products',
          '/admin/categories'
        ]}>
          <Outlet />
        </LoadingProvider>

      </div>
    </>
  );
}

export {Admin};