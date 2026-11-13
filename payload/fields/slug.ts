import type { TextField } from "payload";

/** 網址代稱，例如 about → /about。只允許小寫英文、數字、連字號。 */
export const slugField = (description = "網址用的英文代稱，例如 about"): TextField => ({
  name: "slug",
  label: "網址代稱",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar", description },
  validate: (value: string | null | undefined) =>
    !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? true : "只能用小寫英文、數字與連字號",
});
