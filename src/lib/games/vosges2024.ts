let state = {
  step: 0,
  name: "",
};

export function vosges2024Engine(command: string): string[] {
  const cmd = command.toLowerCase();

  if (state.step === 0) {
    state.step++;
    return ["Welcome, agent.", "Please identify yourself."];
  }

  if (state.step === 1) {
    state.name = command;
    state.step++;
    return [`Identity confirmed: ${state.name}`, "Type 'start' to proceed."];
  }

  if (cmd === "help") {
    return ["Commands: help, start, status"];
  }

  if (cmd === "start") {
    state.step++;
    return ["Initializing puzzle...", "[TODO: insert mini-game here]"];
  }

  if (cmd === "status") {
    return [`Agent: ${state.name}`, `Progress step: ${state.step}`];
  }

  return ["Unknown command. Type 'help'."];
}
