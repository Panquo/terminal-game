// src/lib/engine.ts
import type { Line } from "../model/line";

export type Command = {
  description: string;
  run: (args: string[], ctx: GameContext) => Line[] | Promise<Line[]>;
};

export type GameContext = {
  state: Record<string, any>;
  print: (msg: Line | Line[]) => void;
  clear: () => void;
};

export type GameOptions = {
  commands?: Map<string, Command>;
  state?: Record<string, any>;
};

function getDefaultCommands(): Map<string, Command> {
  const map = new Map<string, Command>();

  map.set("help", {
    description: "List available commands",
    run: (_, ctx) => {
      return [
        "Available commands:",
        ...Array.from(ctx.state._commands.keys()).map(
          (cmd) =>
            `- ${cmd}: ${ctx.state._commands.get(cmd)?.description ?? ""}`
        ),
      ];
    },
  });

  map.set("clear", {
    description: "Clear the screen",
    run: (_, ctx) => {
      ctx.clear();
      return [];
    },
  });

  return map;
}

export function createEngine(options: GameOptions) {
  const defaultCommands = getDefaultCommands();
  const userCommands = options.commands ?? new Map();

  const mergedCommands = new Map(defaultCommands);
  for (const [name, cmd] of userCommands) {
    mergedCommands.set(name, cmd); // override or add
  }

  const state = { ...(options.state || {}), _commands: mergedCommands };

  let buffer: Line[] = [];

  const context: GameContext = {
    state,
    print: (msg) => {
      if (Array.isArray(msg)) buffer.push(...msg);
      else buffer.push(msg);
    },
    clear: () => {
      buffer = [];
    },
  };

  return {
    run: async (input: string): Promise<Line[]> => {
      buffer = [];

      const [cmdName, ...args] = input.trim().split(" ");
      const cmd = mergedCommands.get(cmdName.toLowerCase());

      if (!cmd) {
        buffer.push(
          `Unknown command: ${cmdName}. Type "help" for a list of commands.`
        );
      } else {
        const output = await cmd.run(args, context);
        if (output) context.print(output); // <-- FIXED: keep delay objects!
      }

      return buffer;
    },

    getState: () => context.state,
    getCommands: () => mergedCommands,
  };
}
