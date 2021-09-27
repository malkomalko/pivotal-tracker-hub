<script>
  import { format, formatDistanceToNow } from "date-fns"
  import { pivotalTrackerErrors } from "$lib/stores/errors"
  import { settings as trackerSettings } from "$lib/stores/pivotalTracker"
  import { browser } from "$app/env"
  import { goto } from "$app/navigation"

  let activityItems = []
  let token = $trackerSettings.apiKey

  async function fetchActivities() {
    if (activityItems.length) {
      return
    }

    let apiBase = "https://www.pivotaltracker.com/services/v5"
    let queryOpts = { limit: 500, offset: 0 }
    let queryParams = new URLSearchParams(queryOpts)
    let url = `${apiBase}/workspaces/865796/activity?${queryParams}`
    let headers = { "X-TrackerToken": token }
    let result = await fetch(url, { headers })
    result = await result.json()

    if (result.kind && result.kind === "error") {
      $pivotalTrackerErrors[result.code] = result
      return goto("/settings")
    }

    activityItems = result
    $trackerSettings.activityItems = result
  }

  function date(item) {
    let oa = new Date(item.occurred_at)
    return `<span class='relative-date'>${formatDistanceToNow(oa)}</span> ago on <em>${format(oa, 'yyyy-MM-dd')}</em>`
  }

  $: if (browser) {
    function load() {
      if (!token) {
        return goto("/settings")
      }

      activityItems = $trackerSettings.activityItems

      if (token.length) {
        fetchActivities()
      }
    }
    load()
  }

  $: console.log("activityItems =", activityItems)
</script>

<div>
  <ul role="list" class="divide-y divide-gray-200">
    {#each activityItems as item}
      <li class="py-4">
        <div class="flex space-x-3">
          <div class="flex-1 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <h3 class="text-sm font-medium">{item.performed_by.name}</h3>
                <h4 class="text-sm font-medium text-secondary-500">{item.kind}</h4>
              </div>
              <p class="text-sm text-gray-500">{@html date(item)}</p>
            </div>
            <div>
              <ul class="text-sm">
              {#each item.primary_resources as pr}
                <li>
                  {#if pr.url}
                    <a class="text-primary-600 font-bold" href={pr.url} target="_blank">{pr.name}</a>
                  {:else}
                    {pr.name}
                  {/if}
                  on {item.project.name}
                </li>
              {/each}
              </ul>
            </div>
            <p class="text-sm text-gray-500">{item.message}</p>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
:global(.relative-date) {
  font-weight: bold;
}
</style>
