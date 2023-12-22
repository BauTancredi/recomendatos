export function getCategories(client: any) {
  return client.from("categories").select(`
    id,
    name,
    group
  `);
}
