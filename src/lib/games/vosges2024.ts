import { typeLines, loadingDots } from "../terminal-engine/effects";
import type { Command } from "../terminal-engine/engine";

export function getVosges2024Context() {
  const intro = [
    { text: "Welcome to the Vosges 2024 adventure!", delay: 1000 },
    { text: "Get ready to answer some questions.", delay: 700 },
  ];
  const outro = ["Thanks for playing!", "See you next time!"];

  const steps = [
    {
      question: "Who are you?",
      choices: [
        "Jesus",
        "Merlinou",
        "Yanou",
        "Louen",
        "MAC",
        "Blini",
        "AP",
        "TOMA",
      ],
      validate: (input: string) => {
        const trimmed = input.trim().toLowerCase();
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(trimmed);
        // Only accept single character answers, Merlinou is index 1 ("b")
        return trimmed.length === 1 && idx >= 0 && idx < 8 && idx !== 1;
      },
      storeResult: (input: string, ctx: any) => {
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(
          input.trim().toLowerCase()
        );
        ctx.state.selectedName = steps[0].choices[idx];
      },
      errorMessage: (input: string) => {
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(
          input.trim().toLowerCase()
        );
        if (idx === 1) {
          return ["haha. Well tried, but you are not Merlinou."];
        }
        return ["Incorrect. Try again."];
      },
    },
    {
      question: "Step 1: What is the capital of France?",
      answer: "paris",
      validate: (input: string) => input.trim().toLowerCase() === "paris",
    },
    {
      question: ["Step 2: Which number is even?", "(a) 3", "(b) 4", "(c) 5"],
      answer: "b",
      validate: (input: string) => input.trim().toLowerCase() === "b",
    },
    {
      question: [
        "Step 3: Choose your favorite color:",
        "(a) Red",
        "(b) Blue",
        "(c) Green",
      ],
      choices: ["a", "b", "c"],
      validate: (input: string) => {
        const trimmed = input.trim().toLowerCase();
        return trimmed.length === 1 && ["a", "b", "c"].includes(trimmed);
      },
      storeResult: (input: string, ctx: any) => {
        ctx.state.favoriteColor = input.trim().toLowerCase();
      },
    },
  ];

  // Helper to get question lines as array
  function getQuestionLines(step: any) {
    const lines = Array.isArray(step.question)
      ? [...step.question]
      : [step.question];
    if (step.choices) {
      // Display each choice on its own line with its index letter
      const letters = "abcdefghijklmnopqrstuvwxyz";
      step.choices.forEach((choice: string, idx: number) => {
        lines.push(`(${letters[idx]}) ${choice}`);
      });
    }
    return lines;
  }

  const state = {
    started: false,
    step: 0,
    awaitingAnswer: false,
    name: "",
  };

  const commands = new Map<string, Command>();

  commands.set("start", {
    description: "Begin the memory trip",
    run: async (_, ctx) => {
      if (ctx.state.started) {
        return ["Game already started."];
      }
      ctx.state.started = true;
      ctx.state.step = 0;
      ctx.state.awaitingAnswer = true;

      const lines: Line[] = [
        ...intro,
        { text: "Initializing game...", delay: 1000 },
        { text: "Loading assets...", delay: 800 },
        { text: "Syncing memory core...", delay: 600 },
        { text: "Validating user profile...", delay: 500 },
        { text: "System ready.", delay: 300 },
        { text: "Booting up memory core...", delay: 200 },
        { text: "Preparing questions...", delay: 400 },
        ...getQuestionLines(steps[0]),
        "Type your answer:",
      ];

      let output: string[] = [];
      await printLinesWithDelay(lines, (msg) => output.push(msg));
      return output;
    },
  });

  commands.set("status", {
    description: "Check progress",
    run: (_, ctx) => {
      if (!ctx.state.started) return ["Game not started. Type 'start'."];
      const lines = [`Current step: ${ctx.state.step + 1} / ${steps.length}`];
      if (ctx.state.awaitingAnswer) {
        lines.push("Awaiting answer.");
        lines.push(...getQuestionLines(steps[ctx.state.step]));
        lines.push("Type your answer:");
      } else if (ctx.state.step >= steps.length) {
        lines.push("Game completed!");
      } else {
        lines.push("Ready for next question.");
      }
      return lines;
    },
  });

  commands.set("answer", {
    description: "Answer the current question",
    run: (args, ctx) => {
      if (!ctx.state.started) return ["Start the game first."];
      if (!ctx.state.awaitingAnswer)
        return ["No question to answer right now."];

      const step = steps[ctx.state.step];
      const userAnswer = args.join(" ");
      if (step.validate(userAnswer)) {
        if (step.storeResult) {
          step.storeResult(userAnswer, ctx);
        }
        ctx.state.step++;
        ctx.state.awaitingAnswer = ctx.state.step < steps.length;
        if (ctx.state.step < steps.length) {
          return [
            "Correct!",
            ...getQuestionLines(steps[ctx.state.step]),
            "Type your answer:",
          ];
        } else {
          let endMsg = "Congratulations, you finished the game!";
          if (ctx.state.favoriteColor) {
            endMsg += ` Your favorite color was: ${ctx.state.favoriteColor}.`;
          }
          return ["Correct!", endMsg, ...outro];
        }
      } else {
        // Use custom errorMessage if available
        if (step.errorMessage) {
          return [...step.errorMessage(userAnswer), ...getQuestionLines(step)];
        }
        return ["Incorrect. Try again.", ...getQuestionLines(step)];
      }
    },
  });

  return {
    commands,
    state,
  };
}
type Line = string | { text: string; delay?: number };
async function printLinesWithDelay(
  lines: Line[],
  print: (msg: string) => void,
  defaultDelay = 500
) {
  for (const line of lines) {
    if (typeof line === "string") {
      print(line);
    } else {
      await new Promise((res) => setTimeout(res, line.delay ?? defaultDelay));
      print(line.text);
    }
  }
}
