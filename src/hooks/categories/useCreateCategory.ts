import { api } from "@/context/Providers";
import { useRouter } from "next/navigation";

function useCreateCategory() {
  const router = useRouter();

  const { mutate, isLoading, error } = api.categories.create.useMutation({
    onSuccess: () => {
      router.back();
      router.refresh();
    },
  });

  return {
    createCategory: mutate,
    isCreating: isLoading,
    createCategoryError: error,
  };
}

export default useCreateCategory;
