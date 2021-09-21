<script>
  import "../app.postcss";

  if (typeof localStorage !== "undefined") {
    let token = localStorage.getItem("PT_TOKEN")
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
                  <a href="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
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
          Dashboard
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
