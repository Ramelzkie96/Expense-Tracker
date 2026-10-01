export async function getBudgets(supabase, userId) {
  const { data, error } = await supabase
    .from("budgets")
    .select(`
      id,
      monthly_budget,
      start_date,
      end_date,
      description,
      created_at,
      categories ( id, name, icon_name, icon_bg, icon_color )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// One budget per category (user_id, category_id) is unique in the DB, so
// this upserts: saving the same category again updates the existing row
// instead of erroring.
export async function upsertBudget(supabase, userId, payload) {
  // payload: { categoryId, monthlyBudget, startDate, endDate, description }
  const { data, error } = await supabase
    .from("budgets")
    .upsert(
      {
        user_id: userId,
        category_id: payload.categoryId,
        monthly_budget: payload.monthlyBudget,
        start_date: payload.startDate,
        end_date: payload.endDate ?? null,
        description: payload.description ?? null,
      },
      { onConflict: "user_id,category_id" }
    )
    .select(`
      id,
      monthly_budget,
      start_date,
      end_date,
      description,
      created_at,
      categories ( id, name, icon_name, icon_bg, icon_color )
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBudget(supabase, id) {
  const { data, error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("Budget was not deleted (not found or not permitted).");
  }
}