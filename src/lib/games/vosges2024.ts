import type { Line } from "./../model/line";
import type { Command } from "../terminal-engine/engine";
import { Status } from "../model/enum";
import pkg from "../../../package.json";
const VERSION = pkg.version;

export function getVosges2024Context() {
  const recoveryProgram = ` ____                                      ____                                      
|  _ \\ ___  ___ _____   _____ _ __ _   _  |  _ \\ _ __ ___   __ _ _ __ __ _ _ __ ___  
| |_) / _ \\/ __/ _ \\ \\ / / _ \\ '__| | | | | |_) | '__/ _ \\ / _\` | '__/ _\` | '_ \` _ \\ 
|  _ <  __/ (_| (_) \\ V /  __/ |  | |_| | |  __/| | | (_) | (_| | | | (_| | | | | | |
|_| \\_\\___|\\___\\___/ \\_/ \\___|_|   \\__, | |_|   |_|  \\___/ \\__, |_|  \\__,_|_| |_| |_|
                                    |___/                   |___/                     `;
  const bypanquo = ` ___      ___                           _ 
| _ )_  _| _ \\__ _ _ _  __ _ _  _ ___  / |
| _ \\ || |  _/ _\` | ' \\/ _\` | || / _ \\_| |
|___/\\_, |_| \\__,_|_||_\\__, |\\_,_\\___(_)_|
      |__/                 |_|             
  `;
  const intro = [
    "Welcome to",
    ">>=======================================================================================================<<",
    recoveryProgram,
    bypanquo,
    "Video Memory Recovery Program - v" + VERSION,
    ">>=======================================================================================================<<",
    "\n",
    { text: "Selected file : voj2024.mov", delay: 2000 },
    { text: "Awaiting to start the process...", delay: 1000 },
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
      question: {
        text: "Veuillez indiquer votre identité pour poursuivre la récupération mémoire.",
      },
      choices: [
        "JESUS",
        "MERLIN",
        "YANOU",
        "LOUEN",
        "MAC",
        "BLINI",
        "AP",
        "THOMAS",
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
  ];

  const defaultSteps = [];

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
        question:
          "Puisque seul VRAI HOMME sait s'occuper d'un barbeuc, qui en a pris la responsabilité ?",
        choices: ["Jesus", "Merlinou", "Yanou", "Louen", "AP", "TOMA"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 5;
        },
      },
      {
        question:
          "Parmis les attractions d'Europa Park suivantes, par laquelle avont nous débuté notre journée ?",
        choices: ["Blue Fire", "Silver Star", "Voltron", "Eurosat"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return [
            {
              text: `Fffsshhhht ! ~rollrollroll~ Ce n'est pas la bonne attraction...`,
              status: Status.ERROR,
            },
          ];
        },
      },
    ],
    Louen: [
      {
        question: "Qui est 'Le Ronfleur' ?",
        validate: (input: string) =>
          ["yanou", "yann", "yannou", "le ronfleur"].includes(
            input.trim().toLocaleLowerCase()
          ),
      },
      {
        question:
          "Parmis les attractions d'Europa Park suivantes, par laquelle avont nous débuté notre journée ?",
        choices: ["Blue Fire", "Silver Star", "Voltron", "Eurosat"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return [
            {
              text: `Fffsshhhht ! ~rollrollroll~ Ce n'est pas la bonne attraction...`,
              status: Status.ERROR,
            },
          ];
        },
      },
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
          "Sans tricher sur l'internet mondial, quel est le nom exact du bled dans lequel nous étions ?",
        validate: (input: string) =>
          ["xonrupt-longemer", "xonrupt longemer"].includes(
            input.trim().toLowerCase()
          ),
      },
    ],
    Blini: [
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
        question:
          "Puisque seul VRAI HOMME sait s'occuper d'un barbeuc, qui en a pris la responsabilité ?",
        choices: ["Jesus", "Merlinou", "Yanou", "Louen", "AP", "TOMA"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 5;
        },
      },
      {
        question: "Combien de temps a duré l'escape game apéro ? (environ)",
        choices: [
          "moins d'une heure",
          "entre 1h et 3h",
          "entre 3h et 5h",
          "plus de 5h",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 2;
        },
      },
      {
        question: "De qui a t'on souhaité l'anniversaire pendant le séjour ?",
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLowerCase()),
      },
      {
        question:
          "combien d'euros TOMA a t'il dépensé dans les bonbons de la CDHV ?",
        choices: [
          "moins de 5 euros",
          "un smic",
          "environ deux smics",
          "entre 5 euros et un smic",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num === 2) {
            return [
              {
                text: "Abuse...",
                status: Status.ERROR,
              },
            ];
          } else if (num === 3) {
            return [
              {
                text: "T'es marseillais toi non ? Fratéé",
                status: Status.ERROR,
              },
            ];
          } else if (num === 1) {
            return [
              {
                text: "TOMA n'est pas aussi radin.",
                status: Status.WARN,
              },
            ];
          }
        },
      },
    ],
    AP: [
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
        question:
          "Sans tricher sur l'internet mondial, quel est le nom exact du bled dans lequel nous étions ?",
        validate: (input: string) =>
          ["xonrupt-longemer", "xonrupt longemer"].includes(
            input.trim().toLowerCase()
          ),
      },
      {
        question: "Combien de temps a duré l'escape game apéro ? (environ)",
        choices: [
          "moins d'une heure",
          "entre 1h et 3h",
          "entre 3h et 5h",
          "plus de 5h",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 2;
        },
      },
      {
        question: "De qui a t'on souhaité l'anniversaire pendant le séjour ?",
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLowerCase()),
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
    ],
    TOMA: [
      {
        question: "De qui a t'on souhaité l'anniversaire pendant le séjour ?",
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLowerCase()),
      },
      {
        question: "Qui est 'Le Puant' ?",
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLocaleLowerCase()),
      },
      {
        question:
          "Parmis les attractions d'Europa Park suivantes, par laquelle avont nous débuté notre journée ?",
        choices: ["Blue Fire", "Silver Star", "Voltron", "Eurosat"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return [
            {
              text: `Fffsshhhht ! ~rollrollroll~ Ce n'est pas la bonne attraction...`,
              status: Status.ERROR,
            },
          ];
        },
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
  };

  // Recovery-style mapping for questionSets questions
  const recoveryQuestionsMapping = {
    Jesus: [
      {
        original: "Qui est 'Le Ronfleur' ?",
        recovery:
          "Partition 1 : Anomalie détectée - le terme 'Le Ronfleur' a été rencontré. Assistance utilisateur requise : identifier la personne associée.",
      },
      {
        original:
          "Parmis les ingrédients suivants, lequel permet de tout sublimer, selon LE PUANT ?",
        recovery:
          "Partition 2 : Recherche d'ingrédient optimal selon 'LE PUANT'. Veuillez sélectionner l'élément correct pour la sublimation.",
      },
      {
        original: "Quel animal avez-vous pu observer autour du lac ?",
        recovery:
          "Partition 3 : Analyse de la faune locale autour du lac. Veuillez indiquer l'animal observé pour validation mémoire.",
      },
      {
        original: "Qui est le meilleur Guesser de l'AsperGuessr ?",
        recovery:
          "Partition 4 : Identification du meilleur Guesser dans le module AsperGuessr. Assistance utilisateur requise : fournir le nom correct.",
      },
      {
        original:
          "Quel son de QUALITÉ a été ajouté discrètement à la JAM d'Europa Park ?",
        recovery:
          "Partition 5 : Détection d'ajout sonore dans la JAM d'Europa Park. Veuillez sélectionner le son de qualité ajouté.",
      },
    ],
    Yanou: [
      {
        original: "Que n'y avait-il pas dans la salle de jeux ?",
        recovery:
          "Partition 1 : Vérification des éléments de la salle de jeux. Assistance utilisateur requise : indiquer l'élément en trop.",
      },
      {
        original: "Qui est 'Le Puant' ?",
        recovery:
          "Partition 2 : Identification du terme 'Le Puant'. Veuillez fournir l'identité associée.",
      },
      {
        original:
          "Qui parmis nous s'est fait attraper la veste par les voisins chiant day 1 ?",
        recovery:
          "Partition 3 : Incident détecté - veste attrapée par voisins. Assistance utilisateur requise : identifier la personne concernée.",
      },
      {
        original:
          "Quel son de QUALITÉ a été ajouté discrètement à la JAM d'Europa Park ?",
        recovery:
          "Partition 4 : Détection d'ajout sonore dans la JAM d'Europa Park. Veuillez sélectionner le son de qualité ajouté.",
      },
      {
        original:
          "Où avait été subtilement placé l'apéro, après que ces cons de JESUS et MERLINOU ne l'ai perdu ?",
        recovery:
          "Partition 5 : Localisation de l'apéro après perte. Assistance utilisateur requise : indiquer l'emplacement correct.",
      },
    ],
    MAC: [
      {
        original:
          "Où avait été subtilement placé l'apéro, après que ces cons de JESUS et MERLINOU ne l'ai perdu ?",
        recovery:
          "Partition 1 : Localisation de l'apéro après perte. Assistance utilisateur requise : indiquer l'emplacement correct.",
      },
      {
        original:
          "Parmis les ingrédients suivants, lequel permet de tout sublimer, selon LE PUANT ?",
        recovery:
          "Partition 2 : Recherche d'ingrédient optimal selon 'LE PUANT'. Veuillez sélectionner l'élément correct pour la sublimation.",
      },
      {
        original:
          "Puisque seul VRAI HOMME sait s'occuper d'un barbeuc, qui en a pris la responsabilité ?",
        recovery:
          "Partition 3 : Attribution de la responsabilité du barbecue. Assistance utilisateur requise : identifier la personne responsable.",
      },
      {
        original:
          "Parmis les attractions d'Europa Park suivantes, par laquelle avont nous débuté notre journée ?",
        recovery:
          "Partition 4 : Séquence d'attractions à Europa Park. Veuillez indiquer l'attraction initiale de la journée.",
      },
    ],
    Louen: [
      {
        original: "Qui est 'Le Ronfleur' ?",
        recovery:
          "Partition 1 : Anomalie détectée - le terme 'Le Ronfleur' a été rencontré. Assistance utilisateur requise : identifier la personne associée.",
      },
      {
        original:
          "Parmis les attractions d'Europa Park suivantes, par laquelle avont nous débuté notre journée ?",
        recovery:
          "Partition 2 : Séquence d'attractions à Europa Park. Veuillez indiquer l'attraction initiale de la journée.",
      },
      {
        original: "Que n'y avait-il pas dans la salle de jeux ?",
        recovery:
          "Partition 3 : Vérification des éléments absents dans la salle de jeux. Assistance utilisateur requise : indiquer l'élément manquant.",
      },
      {
        original:
          "Quel son de QUALITÉ a été ajouté discrètement à la JAM d'Europa Park ?",
        recovery:
          "Partition 4 : Détection d'ajout sonore dans la JAM d'Europa Park. Veuillez sélectionner le son de qualité ajouté.",
      },
      {
        original:
          "Sans tricher sur l'internet mondial, quel est le nom exact du bled dans lequel nous étions ?",
        recovery:
          "Partition 5 : Validation du nom du lieu de séjour sans accès externe. Assistance utilisateur requise : fournir le nom exact.",
      },
    ],
    Blini: [
      {
        original: "Quel animal avez-vous pu observer autour du lac ?",
        recovery:
          "Partition 1 : Analyse de la faune locale autour du lac. Veuillez indiquer l'animal observé pour validation mémoire.",
      },
      {
        original:
          "Puisque seul VRAI HOMME sait s'occuper d'un barbeuc, qui en a pris la responsabilité ?",
        recovery:
          "Partition 2 : Attribution de la responsabilité du barbecue. Assistance utilisateur requise : identifier la personne responsable.",
      },
      {
        original: "Combien de temps a duré l'escape game apéro ? (environ)",
        recovery:
          "Partition 3 : Durée de l'escape game apéro. Veuillez sélectionner la durée approximative.",
      },
      {
        original: "De qui a t'on souhaité l'anniversaire pendant le séjour ?",
        recovery:
          "Partition 4 : Identification de la personne fêtée pendant le séjour. Assistance utilisateur requise : fournir le nom.",
      },
      {
        original:
          "combien d'euros TOMA a t'il dépensé dans les bonbons de la CDHV ?",
        recovery:
          "Partition 5 : Analyse des dépenses de TOMA en bonbons à la CDHV. Veuillez indiquer le montant approximatif.",
      },
    ],
    AP: [
      {
        original: "Quel animal avez-vous pu observer autour du lac ?",
        recovery:
          "Partition 1 : Analyse de la faune locale autour du lac. Veuillez indiquer l'animal observé pour validation mémoire.",
      },
      {
        original:
          "Sans tricher sur l'internet mondial, quel est le nom exact du bled dans lequel nous étions ?",
        recovery:
          "Partition 2 : Validation du nom du lieu de séjour sans accès externe. Assistance utilisateur requise : fournir le nom exact.",
      },
      {
        original: "Combien de temps a duré l'escape game apéro ? (environ)",
        recovery:
          "Partition 3 : Durée de l'escape game apéro. Veuillez sélectionner la durée approximative.",
      },
      {
        original: "De qui a t'on souhaité l'anniversaire pendant le séjour ?",
        recovery:
          "Partition 4 : Identification de la personne fêtée pendant le séjour. Assistance utilisateur requise : fournir le nom.",
      },
      {
        original:
          "Qui parmis nous s'est fait attraper la veste par les voisins chiant day 1 ?",
        recovery:
          "Partition 5 : Incident détecté - veste attrapée par voisins. Assistance utilisateur requise : identifier la personne concernée.",
      },
    ],
    TOMA: [
      {
        original: "De qui a t'on souhaité l'anniversaire pendant le séjour ?",
        recovery:
          "Partition 1 : Identification de la personne fêtée pendant le séjour. Assistance utilisateur requise : fournir le nom.",
      },
      {
        original: "Qui est 'Le Puant' ?",
        recovery:
          "Partition 2 : Identification du terme 'Le Puant'. Veuillez fournir l'identité associée.",
      },
      {
        original:
          "Parmis les attractions d'Europa Park suivantes, par laquelle avont nous débuté notre journée ?",
        recovery:
          "Partition 3 : Séquence d'attractions à Europa Park. Veuillez indiquer l'attraction initiale de la journée.",
      },
      {
        original:
          "Parmis les ingrédients suivants, lequel permet de tout sublimer, selon LE PUANT ?",
        recovery:
          "Partition 4 : Recherche d'ingrédient optimal selon 'LE PUANT'. Veuillez sélectionner l'élément correct pour la sublimation.",
      },
      {
        original:
          "Où avait été subtilement placé l'apéro, après que ces cons de JESUS et MERLINOU ne l'ai perdu ?",
        recovery:
          "Partition 5 : Localisation de l'apéro après perte. Assistance utilisateur requise : indiquer l'emplacement correct.",
      },
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
        return ["Le programme est déjà démarré."];
      }
      ctx.state.started = true;
      ctx.state.step = 0;
      ctx.state.awaitingAnswer = true;

      const lines: Line[] = [
        {
          text: `Démarrage de l'algorithme de récupération de mémoire`,
          delay: 1000,
        },
        { text: "Fichier selectionné : voj2024.mov", delay: 600 },
        { text: "Synchronisation de la mémoire...", delay: 1600 },
        { text: "Systeme opérationnel.", delay: 300 },
        { text: "Démarrage du coeur mémoire...", delay: 1200 },
        { text: "Chargement des assets...", delay: 1400 },
        { text: "Initialisation des modules...", delay: 800 },
        { text: "Algorithme prêt.", delay: 500 },
        { text: "Identification requise. ", status: Status.WARN, delay: 800 },
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

      if (
        !ctx.state.steps &&
        ctx.state.step === 0 &&
        steps[0].question.text ===
          "Veuillez indiquer votre identité pour poursuivre la récupération mémoire."
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
