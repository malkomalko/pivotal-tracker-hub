import { browser } from "$app/env"
import { goto } from "$app/navigation"
import { pivotalTrackerErrors } from "$lib/stores/errors"
import { get, set } from "$lib/stores/helpers"
import { settings as trackerSettings } from "$lib/stores/pivotalTracker"

const apiBase = "https://www.pivotaltracker.com/services/v5"
const DEBUG_REQUEST = false
const INCLUDE_STORY_TRANSITIONS = false
const PROFILE_REQUEST_TIME = true
export const PER_PAGE = 100

async function request(url, headers) {
  if (PROFILE_REQUEST_TIME) {
    console.time(url)
  }

  let result = await fetch(url, { headers })
  result = await result.json()

  if (PROFILE_REQUEST_TIME) {
    console.timeEnd(url)
  }

  if (DEBUG_REQUEST) {
    console.log(`${url} =`, result)
  }

  return result
}

function wrap(fn) {
  return function(...args) {
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

    let headers = { "X-TrackerToken": apiKey }

    return fn(headers, workspaceId, ...args)
  }
}

async function activitiesForPage(headers, workspaceId, page) {
  let queryOpts = { limit: PER_PAGE, offset: PER_PAGE * page }
  let queryParams = new URLSearchParams(queryOpts)
  let url = `${apiBase}/workspaces/${workspaceId}/activity?${queryParams}`
  let result = await request(url, headers)

  if (result.kind && result.kind === "error") {
    set(pivotalTrackerErrors, result.code, result)
    return goto("/settings")
  }

  return result
}

export const getActivities = wrap(async (headers, workspaceId, page) => {
  if (page == null) {
    set(trackerSettings, "currentPage", 0)
  }

  const result = await activitiesForPage(headers, workspaceId, page || 0)
  set(trackerSettings, "activityItems", result)
})

export const getWorkspace = wrap(async (headers, workspaceId) => {
  let storyFields = ":default,branches,owners,pull_requests"
  // NOTE: Adding the following transition and cycle based time fields will
  // add multiple seconds (~ 6-8 depending on size) to a request.
  if (INCLUDE_STORY_TRANSITIONS) {
    storyFields += ",cycle_time_details,transitions"
  }
  let fields = `projects(:default,stories(${storyFields}))`
  let url = `${apiBase}/my/workspaces/${workspaceId}?fields=${fields}`

  let result = {}

  try {
    result = await request(url, headers)
  } catch (err) {
    return { error: err }
  }

  return result
})

if (browser) {
  window.pt = {
    getActivities,
    getWorkspace,
  }
}
