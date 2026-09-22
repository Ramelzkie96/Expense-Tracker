export async function getTransactions(supabase, userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      id,
      type,
      amount,
      title,
      subtitle,
      transaction_date,
      transaction_time,
      notes,
      categories ( id, name, icon_name, icon_bg, icon_color ),
      payment_methods ( id, name, icon_key, is_image, icon_bg, icon_color )
    `)
    .eq("user_id", userId)
    .order("transaction_date", { ascending: false })
    .order("transaction_time", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTransaction(supabase, userId, payload) {
  // payload: { type, amount, title, subtitle, categoryId, paymentMethodId,
  //            transactionDate, transactionTime, notes }
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: userId,
      type: payload.type,
      amount: payload.amount,
      title: payload.title,
      subtitle: payload.subtitle ?? null,
      category_id: payload.categoryId,
      payment_method_id: payload.paymentMethodId,
      transaction_date: payload.transactionDate,
      transaction_time: payload.transactionTime ?? null,
      notes: payload.notes ?? null,
    })
    .select(`
      id,
      type,
      amount,
      title,
      subtitle,
      transaction_date,
      transaction_time,
      notes,
      categories ( id, name, icon_name, icon_bg, icon_color ),
      payment_methods ( id, name, icon_key, is_image, icon_bg, icon_color )
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateTransaction(supabase, id, payload) {
  const { data, error } = await supabase
    .from("transactions")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTransaction(supabase, id) {
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw error;
}