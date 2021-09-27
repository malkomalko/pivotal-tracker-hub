<script>
  import { pivotalTrackerErrors } from "$lib/stores/errors"

  let hasToken = false
  let token = ""

  const INVALID_TOKEN = "invalid_authentication"

  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("PT_TOKEN")
    if (token) {
      hasToken = true
    }
  }

  function updateToken(e) {
    token = (e.target.value || "").trim()
    if (token.length) {
      localStorage.setItem("PT_TOKEN", token)
      $pivotalTrackerErrors[INVALID_TOKEN] = null
      hasToken = true
    }
  }
</script>

<form class="space-y-8 divide-y divide-gray-200">
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Pivotal Tracker
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Update the form below to set your Pivotal Tracker api and project settings.
        </p>
      </div>

      <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="pt-api-token" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            API Token
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input on:input={updateToken} value={token} type="password" name="pt-api-token" id="pt-api-token" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
          </div>
        </div>
        {#if $pivotalTrackerErrors[INVALID_TOKEN]}
          <pre class="text-red-500 font-medium">{$pivotalTrackerErrors[INVALID_TOKEN].error}</pre>
        {/if}
      </div>
    </div>
  </div>
</form>
