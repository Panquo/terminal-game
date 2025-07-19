<script lang="ts">
  export let footer: string = "";
  export let prompt: string = "> ";
  import { onMount } from "svelte";
  export let engine;

  let input = "";
  let lines: string[] = [
    "Welcome to the terminal!",
    "Type a command and press Enter.",
    "Use 'help' to see available commands.",
  ];
  let commandHistory: string[] = [];
  let historyIndex: number = -1;

  let terminalEl: HTMLDivElement;
  let inputEl: HTMLInputElement;

  function pushLines(newLines: string[]) {
    lines = [...lines, ...newLines];
    console.log("Pushing lines:", lines);
  }

  onMount(() => {
    const el = document.querySelector("input");
    el?.focus();
  });
  async function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && input.trim()) {
      commandHistory.push(input);
      historyIndex = -1;
      const command = input.trim();
      pushLines([`> ${command}`]);
      input = "";

      const output = await engine.run(command);
      console.log(output);

      if (command === "clear") {
        lines = [];
      } else {
        pushLines(output);
      }
    } else if (event.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        if (historyIndex === -1) {
          historyIndex = commandHistory.length - 1;
        } else if (historyIndex > 0) {
          historyIndex--;
        }
        input = commandHistory[historyIndex];
      }
    } else if (event.key === "ArrowDown") {
      if (commandHistory.length > 0 && historyIndex !== -1) {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input = commandHistory[historyIndex];
        } else {
          historyIndex = -1;
          input = "";
        }
      }
    }
  }

  function scrollToBottom() {
    if (terminalEl) {
      terminalEl.scrollTop = terminalEl.scrollHeight;
    }
  }
  $: if (lines) scrollToBottom();

  function focusInputIfAllowed(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Avoid focusing if clicking on input, button, link, or inside .footer
    if (
      target.tagName === "INPUT" ||
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest(".footer")
    ) {
      return;
    }
    inputEl?.focus();
  }
</script>

<div class="terminal" bind:this={terminalEl} on:click={focusInputIfAllowed}>
  {#each lines as line}
    <div>{line}</div>
  {/each}

  {#if footer}
    <div class="footer">{footer}</div>
  {/if}

  <div class="input-line">
    <span>{prompt}</span>
    <input
      bind:this={inputEl}
      bind:value={input}
      on:keydown={handleKeydown}
      autocomplete="off"
      autofocus
    />
  </div>
</div>

<style>
  .terminal {
    background-color: #111;
    color: #0f0;
    font-family: monospace;
    padding: 1rem;
    white-space: pre-wrap;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .input-line {
    display: flex;
  }

  input {
    background: none;
    border: none;
    outline: none;
    color: #0f0;
    font-family: monospace;
    width: 100%;
  }
  .footer {
    color: #0f0;
    font-family: monospace;
    margin-top: 1ch;
  }
</style>
