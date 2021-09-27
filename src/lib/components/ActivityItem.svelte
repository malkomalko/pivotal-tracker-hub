<script>
  import { format, formatDistanceToNow } from "date-fns"

  export let item

  function date(item) {
    let oa = new Date(item.occurred_at)
    return `<span class='relative-date'>${formatDistanceToNow(oa)}</span> ago on <em>${format(oa, 'yyyy-MM-dd')}</em>`
  }
</script>

<div>
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
</div>
