<script lang="ts">
  export let footer: string = "";

  export let prompt: string = "> ";
  import { onMount } from "svelte";
  import { Status } from "../model/enum";
  import type { Line } from "../model/line";
  export let engine;

  let input = "";
  let lines: (
    | string
    | { type?: string; text: string; label?: string; status?: Status }
  )[] = [];

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
          lines = intro.map((line) => (typeof line === "string" ? line : line));
        } else {
          lines = [intro];
        }
      } else {
        lines = [...defaultLines];
      }
    }
  }

  let commandHistory: string[] = [];
  let historyIndex: number = -1;
  let printing = false;

  let inputEl: HTMLInputElement;

  function pushLines(
    newLines: (string | { type?: string; text: string; label?: string })[]
  ) {
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
        // await tick();
        setTimeout(() => {
          if (inputEl) {
            inputEl.setSelectionRange(input.length, input.length);
          }
        }, 0);
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
        // await tick();
        setTimeout(() => {
          if (inputEl) {
            inputEl.setSelectionRange(input.length, input.length);
          }
        }, 0);
      }
    }
  }

  import { tick } from "svelte";
  function scrollToBottom() {
    const container = document.querySelector(".terminal");
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }
  $: if (lines) scrollToBottom();

  function focusInputIfAllowed(event: MouseEvent | KeyboardEvent) {
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
    inputEl.setSelectionRange(input.length, input.length);
  }

  // Update pushLinesWithDelay to set printing state
  async function pushLinesWithDelay(
    linesToPrint: (
      | string
      | {
          type?: string;
          text: string;
          label?: string;
          status?: string;
          delay?: number;
        }
    )[],
    defaultDelay = 500
  ) {
    printing = true;
    for (const line of linesToPrint) {
      if (typeof line === "string") {
        pushLines([line]);
      } else if (line.type === "link") {
        pushLines([line]);
      } else {
        // Affichage enrichi pour les autres objets (status, etc.)
        pushLines([
          `[${formatDate(Date.now())}] [${line.status ?? Status.INFO}] ${line.text}`,
        ]);
      }
      scrollToBottom();
      await new Promise((res) =>
        setTimeout(
          res,
          typeof line === "object" && line.delay !== undefined
            ? line.delay
            : defaultDelay
        )
      );
    }
    printing = false;
    await tick();
    inputEl?.focus();
  }

  function formatDate(date: number) {
    const d = new Date(date);
    // Example: YYYY-MM-DD HH:mm:ss
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
  }

  function isAsciiArt(line: string) {
    // Simple heuristic: if line contains lots of \ or / or _ or |, treat as art
    return typeof line === "string" && /[\\/_|]{3,}/.test(line);
  }
  function status(line: string): string {
    if (typeof line !== "string") return "";
    if (line.includes("[INFO]")) return "info-tag";
    if (line.includes("[ERROR]")) return "error-tag";
    if (line.includes("[WARN]")) return "warn-tag";
    return "";
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="terminal"
  on:click={focusInputIfAllowed}
  on:keydown={focusInputIfAllowed}
>
  <!-- Render lines -->
  {#each lines as line}
    {#if typeof line === "string"}
      {#if isAsciiArt(line)}
        <pre class="ascii-art">{line}</pre>
      {:else}
        <div class="line {status(line)}">{line}</div>
      {/if}
    {:else if line.type === "link"}
      <div
        class="line {status(
          `[${formatDate(Date.now())}] [${line.status ?? 'INFO'}]`
        )}"
      >
        [{formatDate(Date.now())}] [{line.status ?? "INFO"}]
        <a href={line.text} target="_blank"
          >{line.label ? line.label : line.text}</a
        >
      </div>
    {:else}
      <div class="line">{line.text}</div>
    {/if}
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
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 100vh;
    box-sizing: border-box;
  }
  .line {
    text-align: left;
  }
  .info-tag {
    color: #4a94d5;
    font-weight: bold;
  }
  .warn-tag {
    color: #f7d427;
    font-weight: bold;
  }
  .error-tag {
    color: #ff172e;
    font-weight: bold;
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
  .ascii-art {
    font-family: "Fira Mono", "Consolas", "Menlo", "Monaco", monospace;
    font-size: 1em;
    line-height: 1.05; /* Reduce line height for tighter spacing */
    margin: 0;
    padding: 0;
    white-space: pre;
    background: none;
    border: none;
  }
  /* Optionally, for all lines */
  .terminal div,
  .terminal pre {
    margin: 0;
    padding: 0;
  }
</style>
