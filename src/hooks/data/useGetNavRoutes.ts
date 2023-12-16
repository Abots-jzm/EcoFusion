function useGetNavRoutes(storeId: string, pathname: string) {
  const navRoutes = [
    {
      href: `/dashboard/${storeId}`,
      label: "Overview",
      isActive: pathname === `/dashboard/${storeId}`,
    },
    {
      href: `/dashboard/${storeId}/billboards`,
      label: "Billboards",
      isActive: pathname.startsWith(`/dashboard/${storeId}/billboards`),
    },
    {
      href: `/dashboard/${storeId}/categories`,
      label: "Categories",
      isActive: pathname.startsWith(`/dashboard/${storeId}/categories`),
    },
    {
      href: `/dashboard/${storeId}/products`,
      label: "Products",
      isActive: pathname.startsWith(`/dashboard/${storeId}/products`),
    },
    {
      href: `/dashboard/${storeId}/orders`,
      label: "Orders",
      isActive: pathname === `/dashboard/${storeId}/orders`,
    },
    {
      href: `/dashboard/${storeId}/edit`,
      label: "Edit",
      isActive: pathname === `/dashboard/${storeId}/edit`,
    },
  ];

  return navRoutes;
}

export default useGetNavRoutes;
