import { goto } from "$app/navigation"
import { pivotalTrackerErrors } from "$lib/stores/errors"
import { get, set } from "$lib/stores/helpers"
import { settings as trackerSettings } from "$lib/stores/pivotalTracker"

const apiBase = "https://www.pivotaltracker.com/services/v5"
export const PER_PAGE = 100

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

export async function fetchActivities(page) {
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

  const result = await activitiesForPage(apiKey, workspaceId, page || 0)
  set(trackerSettings, "activityItems", result)
}
