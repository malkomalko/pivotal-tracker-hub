import { goto } from "$app/navigation"
import { pivotalTrackerErrors } from "$lib/stores/errors"
import { settings as trackerSettings } from "$lib/stores/pivotalTracker"

const apiBase = "https://www.pivotaltracker.com/services/v5"
const PER_PAGE = 100

function get(writableStore, key) {
  let value = null
  writableStore.update(s => {
    value = s[key]
    return s
  })
  return value
}

function set(writableStore, key, value) {
  writableStore.update(s => {
    s[key] = value
    return s
  })
}

async function activitiesForPage(apiKey, workspaceId, page) {
  let queryOpts = { limit: PER_PAGE, offset: PER_PAGE * page }
  let queryParams = new URLSearchParams(queryOpts)
  let url = `${apiBase}/workspaces/${workspaceId}/activity?${queryParams}`
  let headers = { "X-TrackerToken": apiKey }
  let result = await fetch(url, { headers })
  result = await result.json()

  if (result.kind && result.kind === "error") {
    set(pivotalTrackerErrors, result.code, result)
    return goto("/settings")
  }

  return result
}

export async function fetchActivities() {
  const apiKey = get(trackerSettings, "apiKey")
  if (!apiKey) {
    return goto("/settings")
  }

  const workspaceId = get(trackerSettings, "workspaceId")
  if (!workspaceId || !workspaceId.trim().length) {
    set(pivotalTrackerErrors, "missing_workspace_id", {
      error: "Please select a workspace or set a workspace id"
    })
    return goto("/settings")
  }

  const result = await activitiesForPage(apiKey, workspaceId, 0)
  set(trackerSettings, "activityItems", result)
}
