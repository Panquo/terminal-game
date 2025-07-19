<script lang="ts">
  import Terminal from "./lib/terminal-engine/Terminal.svelte";
  import { createEngine } from "./lib/terminal-engine/engine";
  import { getVosges2024Context } from "./lib/games/vosges2024";

  const engine = createEngine(getVosges2024Context());
</script>

<Terminal {engine} />
