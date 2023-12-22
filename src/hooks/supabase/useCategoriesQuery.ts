import { useQuery } from "react-query";
import { getCategories } from "@/queries/getCategories";
import { getSupabase } from "@/utils/supabase";

export function useCategoriesQuery() {
  const supabase = getSupabase();

  const queryKey = ["categories"];

  const queryFn = async () => {
    return getCategories(supabase);
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: true,
    retry: false,
  });
}
