import { writable } from "svelte-local-storage-store"

export const settings = writable("storage_pivotalTracker", {
  activityItems: [],
  apiKey: "",
  currentPage: 0,
})
