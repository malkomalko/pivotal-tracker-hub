<script>
  import { PER_PAGE, getActivities } from "$lib/domain/pivotalTrackerApi"
  import { settings as trackerSettings } from "$lib/stores/pivotalTracker"

  let from = null
  let to = null
  let total = null

  function next() {
    $trackerSettings.currentPage = currentPage + 1
    getActivities($trackerSettings.currentPage)
  }

  function prev() {
    if (currentPage <= 0) {
      return
    }

    $trackerSettings.currentPage = currentPage - 1
    getActivities($trackerSettings.currentPage)
  }

  $: currentPage = $trackerSettings.currentPage || 0

  $: {
    from = PER_PAGE * currentPage
    to = from + PER_PAGE
    total = (currentPage + 1) * PER_PAGE
  }
</script>

<nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
  <div class="hidden sm:block">
    <p class="text-sm text-gray-700">
      Showing
      <span class="font-medium">{from}</span>
      to
      <span class="font-medium">{to}</span>
      of
      <span class="font-medium">{total}</span>
      results
    </p>
  </div>
  <div class="flex-1 flex justify-between sm:justify-end">
    <button on:click={prev} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
      Previous
    </button>
    <button on:click={next} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
      Next
    </button>
  </div>
</nav>
