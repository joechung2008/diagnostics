<script lang="ts">
  import Diagnostics from './Diagnostics.svelte'
  import { SvelteUIProvider } from '@svelteuidev/core'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <SvelteUIProvider withGlobalStyles themeObserver="dark">
    <Diagnostics />
  </SvelteUIProvider>
</QueryClientProvider>
