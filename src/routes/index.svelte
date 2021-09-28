<script>
  import ActivityFooter from "$lib/components/ActivityFooter.svelte"
  import ActivityHeader from "$lib/components/ActivityHeader.svelte"
  import ActivityItem from "$lib/components/ActivityItem.svelte"
  import { getActivities } from "$lib/domain/pivotalTrackerApi"
  import { settings as trackerSettings } from "$lib/stores/pivotalTracker"
  import { browser } from "$app/env"
  import { onMount } from "svelte"

  let activityItems = []

  onMount(() => {
    $trackerSettings.currentPage = 0
  })

  $: {
    activityItems = $trackerSettings.activityItems || []
    if (browser && !activityItems.length) {
      getActivities()
    }
  }
</script>

<div>
  <ActivityHeader />
  <ul role="list" class="activity-list divide-y divide-gray-200 overflow-auto">
    {#each activityItems as item}
      <ActivityItem item={item} />
    {/each}
  </ul>
  <ActivityFooter />
</div>

<style>
  :global(.relative-date) {
    font-weight: bold;
  }
  ul.activity-list {
    height: 400px;
  }
</style>
