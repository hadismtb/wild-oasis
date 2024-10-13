import supabase from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Cabins could not be loaded!");
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function addCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.error("Cabins could not be added!");
    throw new Error("Cabins could not be added!");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Cabins could not be deleted!");
    throw new Error("Cabins could not be deleted!");
  }

  return data;
}
