<script lang="ts">
	import { onMount } from "svelte";
	export let engine: (input: string) => string[] | Promise<string[]>;

	let lines: string[] = [
		"System initialized...",
		"Type 'help' to begin.",
		""
	];
	let input = "";

	async function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" && input.trim()) {
			const command = input.trim();
			lines = [...lines, `> ${command}`];
			input = "";

			const output = await engine(command);
			lines = [...lines, ...output];
		}
	}

	onMount(() => {
		const el = document.querySelector("input");
		el?.focus();
	});
</script>

<style>
	.terminal {
		background-color: #111;
		color: #0f0;
		font-family: monospace;
		padding: 1rem;
		min-height: 100vh;
		white-space: pre-wrap;
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
</style>

<div class="terminal">
	{#each lines as line}
		<div>{line}</div>
	{/each}

	<div class="input-line">
		<span>&gt; </span>
		<input
			bind:value={input}
			on:keydown={handleKeydown}
			autocomplete="off"
		/>
	</div>
</div>
