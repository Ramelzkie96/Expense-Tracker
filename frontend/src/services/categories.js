export async function getCategories(supabase) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getPaymentMethods(supabase) {
  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}