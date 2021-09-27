<script>
  import { fetchActivities } from "$lib/domain/pivotalTrackerApi"

  function refresh() {
    fetchActivities()
  }
</script>

<div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
  <h3 class="text-lg leading-6 font-medium text-gray-900">
    Activity
  </h3>
  <div class="mt-3 sm:mt-0 sm:ml-4">
    <button on:click={refresh} type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
      Refresh
    </button>
  </div>
</div>
