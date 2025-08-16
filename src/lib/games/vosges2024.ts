import type { Line } from "./../model/line";
import type { Command } from "../terminal-engine/engine";
import { Status } from "../model/enum";

export function getVosges2024Context() {
  const art = ` 
__/\\\\\\________/\\\\\\_______________________________________/\\\\\\\\\\\\\\\\\\_________/\\\\\\\\\\\\\\_______/\\\\\\\\\\\\\\\\\\________________/\\\\\\____        
 _\\/\\\\\\_______\\/\\\\\\_____________________/\\\\\\____________/\\\\\\///////\\\\\\_____/\\\\\\/////\\\\\\___/\\\\\\///////\\\\\\____________/\\\\\\\\\\____       
  _\\//\\\\\\______/\\\\\\_____________________\\///____________\\///______\\//\\\\\\___/\\\\\\____\\//\\\\\\_\\///______\\//\\\\\\_________/\\\\\\/\\\\\\____      
   __\\//\\\\\\____/\\\\\\_______/\\\\\\\\\\__________/\\\\\\_____________________/\\\\\\/___\\/\\\\\\_____\\/\\\\\\___________/\\\\\\/________/\\\\\\/\\/\\\\\\____     
    ___\\//\\\\\\__/\\\\\\______/\\\\\\///\\\\\\_______\\/\\\\\\__________________/\\\\\\//_____\\/\\\\\\_____\\/\\\\\\________/\\\\\\//________/\\\\\\/__\\/\\\\\\____    
     ____\\//\\\\\\/\\\\\\______/\\\\\\__\\//\\\\\\______\\/\\\\\\_______________/\\\\\\//________\\/\\\\\\_____\\/\\\\\\_____/\\\\\\//_________/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_   
      _____\\//\\\\\\\\\\______\\//\\\\\\__/\\\\\\___/\\\\_\\/\\\\\\_____________/\\\\\\/___________\\//\\\\\\____/\\\\\\____/\\\\\\/___________\\///////////\\\\\\//__  
       ______\\//\\\\\\________\\///\\\\\\\\\\/___\\//\\\\\\\\\\\\_____________/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\__\\///\\\\\\\\\\\\\\/____/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\___________\\/\\\\\\____ 
        _______\\///___________\\/////______\\//////_____________\\///////////////_____\\///////_____\\///////////////____________\\///_____
`;
  const art2 = `
.----.-----.----.-----.--.--.-----.----.--.--.   .-----.----.-----.-----.----.---.-.--------.
|   _|  -__|  __|  _  |  |  |  -__|   _|  |  |   |  _  |   _|  _  |  _  |   _|  _  |        |
|__| |_____|____|_____|\\___/|_____|__| |___  |   |   __|__| |_____|___  |__| |___._|__|__|__|
                   |_____|   |__|             |_____|                    
`;
  const intro = [
    "Welcome to the",
    "\n",
    art.trim(),
    art2.trim(),
    "\n",
    "Get ready to answer some questions.",
  ];
  const outro = [
    { text: "Processing answers...", delay: 1000 },
    { text: "Loading bits...", delay: 100 },
    { text: "Filling memory leaks...", delay: 100 },
    { text: "Finalising recovery...", delay: 1000 },
    { text: "Memory recovery complete!", delay: 100 },
    { text: "Packing memory...", delay: 500 },
    { text: "Compressing data...", delay: 200 },
    { text: "Finalizing file...", delay: 100 },
    { text: "File saved successfully!", delay: 100 },
    { text: "Here is your file :", delay: 100 },
  ];

  let steps = [
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
        const num = parseInt(input.trim(), 10);
        return !isNaN(num) && num >= 1 && num <= 4; // 4 choices in this example
      },
      storeResult: (input: string, ctx: any) => {
        const idx = parseInt(input.trim()) - 1;

        ctx.state.selectedName = steps[0].choices[idx];
        // Set the question set for the selected name
        ctx.state.steps = questionSets[ctx.state.selectedName] || defaultSteps;
        console.log(`You selected: ${ctx.state.steps[0].question}`);
      },
      errorMessage: (input: string) => {
        const idx = parseInt(input.trim()) - 1;

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

  const defaultSteps = [
    {
      question: "What is your quest?",
      choices: [
        "To seek the Holy Grail",
        "To defend the realm",
        "To explore new lands",
        "To study the stars",
      ],
      validate: (input: string) => {
        const trimmed = input.trim().toLowerCase();
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(trimmed);
        return trimmed.length === 1 && idx >= 0 && idx < 4;
      },
      storeResult: (input: string, ctx: any) => {
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(
          input.trim().toLowerCase()
        );
        ctx.state.quest = defaultSteps[0].choices[idx];
      },
    },
    {
      question: "What is your favorite animal?",
      choices: [
        "Lion",
        "Eagle",
        "Dolphin",
        "Wolf",
        "Elephant",
        "Giraffe",
        "Bear",
        "Shark",
      ],
      validate: (input: string) => {
        const trimmed = input.trim().toLowerCase();
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(trimmed);
        return trimmed.length === 1 && idx >= 0 && idx < 8;
      },
      storeResult: (input: string, ctx: any) => {
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(
          input.trim().toLowerCase()
        );
        ctx.state.animal = defaultSteps[1].choices[idx];
      },
    },
    {
      question: "What is your preferred mode of transport?",
      choices: [
        "Horseback",
        "Chariot",
        "Boat",
        "Walking",
        "Cycling",
        "Motorcycle",
        "Car",
        "Airplane",
      ],
      validate: (input: string) => {
        const trimmed = input.trim().toLowerCase();
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(trimmed);
        return trimmed.length === 1 && idx >= 0 && idx < 8;
      },
      storeResult: (input: string, ctx: any) => {
        const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(
          input.trim().toLowerCase()
        );
        ctx.state.transport = defaultSteps[2].choices[idx];
      },
    },
  ];

  const questionSets: Record<string, any[]> = {
    Jesus: [
      {
        question: "Qui est 'Le Ronfleur' ?",
        validate: (input: string) =>
          ["yanou", "yann", "yannou", "le ronfleur"].includes(
            input.trim().toLocaleLowerCase()
          ),
      },
      {
        question:
          "Parmis les ingrédients suivants, lequel permet de tout sublimer, selon LE PUANT ?", //TODO: use caps for names for consistency
        choices: ["la bière", "le parmesan", "la glace vanille", "le houmous"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num == 2;
        },
        errorMessage: (input: string) => {
          return ["Incorrect. Try again. HAHA!"];
        },
      },
      {
        question: "Quel animal avez-vous pu observer autour du lac ?",
        choices: [
          "Des Turducken",
          "Une Silure de 2,6m",
          "DES CANARDS",
          "COIN~han~",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && (num == 3 || num == 4);
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num === 1) {
            return [
              {
                text: "Un Turducken est bien imbriqué dans la mémoire, mais il ne semble pas être lié au lac.",
                status: Status.ERROR,
              },
            ];
          } else if (num === 2) {
            return [
              {
                text: "Overflow mémoire détecté",
                status: Status.WARN,
              },
              {
                text: "Impossible de stocker un Silure de 2,6m dans la mémoire.",
                status: Status.WARN,
              },
            ];
          }
          return ["Incorrect. Try again. HAHA!"];
        },
      },
      {
        question: "Qui est le meilleur Guesser de l'AsperGuessr ?",
        validate: (input: string) =>
          ["hanna", "anna", "hhanna", "hhhanna"].includes(
            input.trim().toLowerCase()
          ),
        errorMessage: (input: string) => {
          return [
            {
              text: "Le spectre est pas bon Kevin.",
              status: Status.WARN,
            },
            {
              text: "L'entrée ne correspond à rien en mémoire...",
              status: Status.ERROR,
              delay: 500,
            },
            {
              text: "Think outside the box.",
              status: Status.INFO,
            },
          ];
        },
      },
      {
        question:
          "Quel son de QUALITÉ a été ajouté discrètement à la JAM d'Europa Park ?",
        choices: [
          "Alarme Incendie Remix b00m bOOM || a + ib",
          "Le sanglier - DaPoule",
          "FORT BOYARD - REMIX",
          "Vortek's - La Soupe Aux Choux (Remix)",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 3;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return [
            {
              text: `Bien que ce BANGER ait bien été joué dans la semaine, ça n'est pas celui qui est recherché`,
              status: Status.ERROR,
            },
          ];
        },
      },
    ],
    Yanou: [
      {
        question: "Que n'y avait-il pas dans la salle de jeux ?",
        choices: [
          "Un billard",
          "Un baby-foot",
          "Du skill",
          "John Fitzgerald Kennedy",
          "Un jeu de fléchettes",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 3;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num === 3) {
            return [
              {
                text: "LOUEN est une preuve vivante (ce jeu a peut-être mal vieilli) qu'il y avait du skill.",
                status: Status.WARN,
              },
            ];
          } else if (num === 4) {
            return [
              {
                text: "Jamais John Fitzgerald Kennedy n'aurait laissé faire ça... 🙅‍♂️ C'est-à-dire qu'il y a 42 millions d'ukrainiens 🇺🇦 70% sont des chrétiens ✝️ et le pape RESTE au Vatican 🏛️ AU LIEU D'ALLER À KIEV ??? 😡 et de dire TUEZ-MOI ☠️ Je représente le Christ ⛪️ JE REPRÉSENTE LE CHRIST 🙏",
                status: Status.ERROR,
              },
            ];
          } else if (num === 5 || num === 1 || num === 2) {
            return [
              {
                text: "Il semble que cet élément soit bien présent en mémoire...",
                status: Status.ERROR,
              },
            ];
          }
          return [
            {
              text: "Incorrect. Try again.",
              status: Status.ERROR,
            },
          ];
        },
      },
      {
        question: "Qui est 'Le Puant' ?",
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLocaleLowerCase()),
      },
      {
        question:
          "Qui parmis nous s'est fait attraper la veste par les voisins chiant day 1 ?",
        choices: ["Jesus", "Yanou", "Louen", "MAC", "TOMA"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 1;
        },
        errorMessage: (input: string) => {
          return [
            {
              text: "Il est lié à cette histoire mais il ne s'est pas fait bully (cette fois).",
              status: Status.ERROR,
            },
          ];
        },
      },
      {
        question:
          "Quel son de QUALITÉ a été ajouté discrètement à la JAM d'Europa Park ?",
        choices: [
          "Alarme Incendie Remix b00m bOOM || a + ib",
          "Le sanglier - DaPoule",
          "FORT BOYARD - REMIX",
          "Vortek's - La Soupe Aux Choux (Remix)",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 3;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return [
            {
              text: `Bien que ce BANGER ait bien été joué dans la semaine, ça n'est pas celui qui est recherché`,
              status: Status.ERROR,
            },
          ];
        },
      },
      {
        question:
          "Où avait été subtilement placé l'apéro, après que ces cons de JESUS et MERLINOU ne l'ai perdu ?",
        choices: [
          "Dans le coffre de la voiture de BLINI",
          "Dans le coffre de la voiture de YANOU",
          "Dans ton cul",
          "Dans le coffre de la voiture de LOUEN",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
      },
    ],
    MAC: [
      {
        question: "What is MAC's favorite programming language?",
        validate: (input: string) =>
          input.trim().toLowerCase() === "javascript",
      },
      // ...more questions for MAC
    ],
    Louen: [
      {
        question: "What is Louen's favorite hobby?",
        validate: (input: string) => input.trim().toLowerCase() === "fishing",
      },
      // ...more questions for Louen
    ],
    Blini: [
      {
        question: "What is Blini's favorite food?",
        validate: (input: string) => input.trim().toLowerCase() === "pancakes",
      },
      // ...more questions for Blini
    ],
    AP: [
      {
        question: "What is AP's favorite movie?",
        validate: (input: string) => input.trim().toLowerCase() === "inception",
      },
      // ...more questions for AP
    ],
    TOMA: [
      {
        question: "What is TOMA's favorite game?",
        validate: (input: string) => input.trim().toLowerCase() === "chess",
      },
      // ...more questions for TOMA
    ],
  };

  // Helper to get question lines as array
  function getQuestionLines(step: any) {
    const lines = Array.isArray(step.question)
      ? [...step.question]
      : [step.question];
    if (step.choices) {
      step.choices.forEach((choice: string, idx: number) => {
        lines.push(`(${idx + 1}) ${choice}`);
      });
    }
    return lines;
  }

  const state = {
    intro: intro,
    started: false,
    step: 0,
    awaitingAnswer: false,
    name: "",
  };

  const commands = new Map<string, Command>();

  commands.set("start", {
    description: "Begin recovery program",
    run: async (_, ctx) => {
      if (ctx.state.started) {
        return ["Program is already running."];
      }
      ctx.state.started = true;
      ctx.state.step = 0;
      ctx.state.awaitingAnswer = true;

      const lines: Line[] = [
        {
          text: `Recovery algorithm initiated`,
          delay: 1000,
        },
        { text: "Syncing memory core...", delay: 600 },
        { text: "System ready.", delay: 300 },
        { text: "Booting up memory core...", delay: 200 },
        { text: "Loading assets...", delay: 1400 },
        { text: "Preparing questions...", delay: 400 },
        { text: "Questions are ready.", delay: 500 },
        ...getQuestionLines(steps[0]),
        "Type your answer:",
      ];
      return lines;
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

      let activeSteps = ctx.state.steps || steps;
      const step = activeSteps[ctx.state.step];
      const userAnswer = args.join(" ");

      // Special case: just finished the "Who are you?" question
      if (
        !ctx.state.steps &&
        ctx.state.step === 0 &&
        steps[0].question === "Who are you?"
      ) {
        // Validate and store the selected name
        if (step.validate(userAnswer)) {
          if (step.storeResult) step.storeResult(userAnswer, ctx);
          ctx.state.steps =
            questionSets[ctx.state.selectedName] || defaultSteps;
          ctx.state.name = ctx.state.selectedName;
          ctx.state.step = 0; // Start at the first question of the selected set
          ctx.state.awaitingAnswer = true;
          return [
            `Bienvenue ${ctx.state.name}!`,
            ...getQuestionLines(ctx.state.steps[ctx.state.step]),
          ];
        } else {
          if (step.errorMessage) {
            return [
              ...step.errorMessage(userAnswer),
              ...getQuestionLines(step),
            ];
          }
          return [
            { text: "Incorrect. Try again.", status: Status.ERROR }, //TODO: generate error messages
            ,
            ...getQuestionLines(step),
          ];
        }
      }

      if (step.validate(userAnswer)) {
        if (step.storeResult) step.storeResult(userAnswer, ctx);
        ctx.state.step++;
        ctx.state.awaitingAnswer = ctx.state.step < activeSteps.length;

        if (ctx.state.step < activeSteps.length) {
          return [
            "Correct!",
            ...getQuestionLines(activeSteps[ctx.state.step]),
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
