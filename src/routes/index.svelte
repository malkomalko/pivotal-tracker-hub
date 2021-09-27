<script>
  import ActivityItem from "$lib/components/ActivityItem.svelte"
  import { fetchActivities } from "$lib/domain/pivotalTrackerApi"
  import { settings as trackerSettings } from "$lib/stores/pivotalTracker"
  import { browser } from "$app/env"

  let activityItems = []

  $: {
    activityItems = $trackerSettings.activityItems || []
    if (browser && !activityItems.length) {
      fetchActivities()
    }
  }

  $: console.log("activityItems =", activityItems)
</script>

<div>
  <ul role="list" class="divide-y divide-gray-200">
    {#each activityItems as item}
      <ActivityItem item={item} />
    {/each}
  </ul>
</div>

<style>
:global(.relative-date) {
  font-weight: bold;
}
</style>
