<script>
  import { format, formatDistanceToNow } from "date-fns"

  let token = null

  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("PT_TOKEN")
    if (!token) {
      let promptResult = prompt("Enter your tracker token")
      promptResult = promptResult || ""
      promptResult = promptResult.trim()
      if (promptResult.length) {
        token = promptResult
        localStorage.setItem("PT_TOKEN", token)
      }
    }
  }

  let activityItems = []

  async function fetchActivities() {
    if (typeof localStorage !== "undefined") {
      const activities = localStorage.getItem("ACTIVITIES") || ""
      try {
        activityItems = JSON.parse(activities)
      } catch (_err) {}
    }

    if (activityItems.length) {
      return
    }

    let apiBase = "https://www.pivotaltracker.com/services/v5"
    let queryOpts = { limit: 500, offset: 0 }
    let queryParams = new URLSearchParams(queryOpts)
    let url = `${apiBase}/workspaces/865796/activity?${queryParams}`
    let headers = { "X-TrackerToken": token }
    let result = await fetch(url, { headers })
    activityItems = await result.json()
    localStorage.setItem("ACTIVITIES", JSON.stringify(activityItems))
  }

  function date(item) {
    let oa = new Date(item.occurred_at)
    return `<span class='relative-date'>${formatDistanceToNow(oa)}</span> ago on <em>${format(oa, 'yyyy-MM-dd')}</em>`
  }

  $: if (token && token.length) {
    fetchActivities()
  }

  $: console.log("activityItems =", activityItems)
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div>
  <ul role="list" class="divide-y divide-gray-200">
    {#each activityItems as item}
      <li class="py-4">
        <div class="flex space-x-3">
          <div class="flex-1 space-y-1">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium">{item.performed_by.name}</h3>
              <p class="text-sm text-gray-500">{@html date(item)}</p>
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
