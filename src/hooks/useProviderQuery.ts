import { useQuery } from "react-query";
import { getProviderById } from "@/queries/getProviderById";
import { getSupabase } from "@/utils/supabase";

function useProviderQuery(providerId: string) {
  const supabase = getSupabase();

  const queryKey = ["provider", providerId];

  const queryFn = async () => {
    return getProviderById(providerId, supabase);
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: true,
  });
}

export default useProviderQuery;
