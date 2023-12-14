export function getProviderById(providerId: string, client: any) {
  return client
    .from("providers")
    .select(
      `
    id,
    first_name,
    last_name,
    bio
  `
    )
    .eq("clerk_id", providerId)
    .throwOnError()
    .single();
}
