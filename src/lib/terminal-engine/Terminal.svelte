<script lang="ts">
  export let footer: string = "";
  export let prompt: string = "> ";
  import { onMount } from "svelte";
  import { Status } from "../model/enum";
  import type { Line } from "../model/line";
  export let engine;

  let input = "";
  let lines: string[] = [];

  // Initialize lines with intro if present, otherwise default
  const defaultLines = [
    "Welcome to the terminal!",
    "Type a command and press Enter.",
    "Use 'help' to see available commands.",
  ];

  $: {
    const intro = engine?.getState()?.intro;
    if (lines.length === 0) {
      if (intro) {
        if (Array.isArray(intro)) {
          lines = intro.map((line) =>
            typeof line === "string" ? line : line.text
          );
        } else {
          lines = [typeof intro === "string" ? intro : intro.text];
        }
      } else {
        lines = [...defaultLines];
      }
    }
  }

  let commandHistory: string[] = [];
  let historyIndex: number = -1;
  let printing = false;

  let terminalEl: HTMLDivElement;
  let inputEl: HTMLInputElement;

  function pushLines(newLines: string[]) {
    lines = [...lines, ...newLines];
    // console.log("Pushing lines:", lines);
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
      // console.log("Command output:", output);
      // console.log(output);

      if (command === "clear") {
        lines = [];
      } else {
        await pushLinesWithDelay(output);
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

  // Update pushLinesWithDelay to set printing state
  async function pushLinesWithDelay(linesToPrint: Line[], defaultDelay = 500) {
    printing = true;
    for (const line of linesToPrint) {
      if (typeof line === "string") {
        pushLines([line]);
      } else {
        pushLines([
          `[${formatDate(Date.now())}] [${line.status ?? Status.INFO}] ${line.text}`,
        ]);
        await new Promise((res) => setTimeout(res, line.delay ?? defaultDelay));
      }
    }
    printing = false;
  }

  function formatDate(date: number) {
    const d = new Date(date);
    // Example: YYYY-MM-DD HH:mm:ss
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
  }
</script>

<div class="terminal" bind:this={terminalEl} on:click={focusInputIfAllowed}>
  {#each lines as line}
    <div class="line">{line}</div>
  {/each}

  {#if footer}
    <div class="footer">{footer}</div>
  {/if}

  {#if !printing}
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
  {/if}
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
    .line{
      text-align: left;
    }
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
  input:disabled {
    background: none;
    color: #444;
    cursor: not-allowed;
  }
  .footer {
    color: #0f0;
    font-family: monospace;
    margin-top: 1ch;
  }
</style>
