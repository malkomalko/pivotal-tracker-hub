<script context="module">
  export async function load({ page }) {
    let currentPath = page.path
    let header = ""

    switch(page.path) {
      case "/":
        header = "Dashboard"
        break;
      case "/settings":
        header = "Settings"
        break;
      default:
        header = ""
    }

    return {
      status: 200,
      props: {
        currentPath,
        header
      }
    }
  }
</script>

<script>
  import "../app.postcss";

  export let currentPath
  export let header

  function navClasses(path, currentPath) {
    return path === currentPath
      ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
  }
</script>

<div>
  <div class="bg-gray-800 pb-32">
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="border-b border-gray-700">
          <div class="flex items-center justify-between h-16 px-4 sm:px-0">
            <div class="flex items-center">
              <div class="hidden md:block">
                <div class="flex items-baseline space-x-4">
                  <a href="/" class={navClasses("/", currentPath)} aria-current="page">Dashboard</a>
                  <a href="/settings" class={navClasses("/settings", currentPath)}>Settings</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <header class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-white">
          {header}
        </h1>
      </div>
    </header>
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <slot />
      </div>
    </div>
  </main>
</div>
