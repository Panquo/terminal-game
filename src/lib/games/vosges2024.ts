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
    { type: "link", text: "https://example.com", label: "Lien : https://example.com", delay: 100 },
    { text: "Mot de passe : date de location au format ddmmYY", delay: 100 },
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
        return !isNaN(num) && num != 2 && num >= 1 && num <= 8; // 4 choices in this example
      },
      storeResult: (input: string, ctx: any) => {
        const idx = parseInt(input.trim()) - 1;
        ctx.state.selectedName = steps[0].choices[idx];
        // Set the question set for the selected name
        ctx.state.steps =
          questionSets[ctx.state.selectedName.toLocaleLowerCase()] ||
          defaultSteps;
      },
      errorMessage: (input: string) => {
        const idx = parseInt(input.trim()) - 1;
        if (idx === 1) {
          return [
            {
              text: "Vous ne pouvez statistiquement pas être MERLIN.",
              status: Status.ERROR,
            },
          ];
        }
        return [
          {
            text: "Identité non reconnue. Veuillez réessayer.",
            status: Status.ERROR,
          },
        ];
      },
      result: [
        { text: "Identification...", delay: 300 },
        { text: "Individu validé.", delay: 100 },
      ],
    },
  ];

  const defaultSteps = [];

  const questionSets: Record<string, any[]> = {
    jesus: [
      {
        question: [
          { text: "Démarrage de la récupération :", delay: 0 },
          { text: "Partition 1/5", delay: 600 },
          { text: "Recherche des autre participants...", delay: 1200 },
          {
            text: "Anomalie détectée: terme 'LE RONFLEUR' rencontré",
            delay: 200,
            status: Status.WARN,
          },
          {
            text: "Association incomplète - assistance requise",
            delay: 200,
            status: Status.WARN,
          },
          {
            text: "Partition 1 : Identifiez la personne associée à 'LE RONFLEUR'.",
          },
        ],
        validate: (input: string) =>
          ["yanou", "yann", "yannou", "le ronfleur"].includes(
            input.trim().toLocaleLowerCase()
          ),
        errorMessage: (input: string) => {
          return [
            {
              text: "Identification impossible. Réessayez.",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Association correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 1 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 2/5", delay: 200 },
          {
            text: "Recherche d'ingrédient de sublimation optimal...",
            delay: 600,
          },
          { text: "Avis objectif de 'LE PUANT'.", delay: 300 },
          {
            text: "Identification de l'élément nécessaire :",
            delay: 100,
            status: Status.WARN,
          },
        ],
        choices: ["Bière", "Parmesan", "Glace saveur - vanille -", "Houmous"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num == 2;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
            case 3:
              return [
                {
                  text: "Bien qu'une association soit liée, ça n'est pas le bon ingrédient.",
                  status: Status.ERROR,
                },
              ];
            case 4:
              return [
                {
                  text: "Le houmous est peut-être optimal pour la santé, mais pas pour la sublimation.",
                  status: Status.ERROR,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Sublimation réussie. Ingrédient optimal correct.",
            delay: 500,
          },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 2 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 3/5", delay: 200 },
          {
            text: "Analyse de la faune locale autour du lac...",
            delay: 600,
          },
          {
            text: "Identification de l'animal observé nécessaire pour validation mémoire.",
            delay: 300,
            status: Status.WARN,
          },
        ],
        choices: [
          "Imbrication Turducken",
          "Une Silure de 2,6m",
          "DES CANARDS",
          "COIN~han~",
          "AP",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && (num == 3 || num == 4);
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
              return [
                {
                  text: "Un Turducken est bien imbriqué dans la mémoire, mais il ne semble pas être lié au lac.",
                  status: Status.ERROR,
                },
              ];
            case 2:
              return [
                {
                  text: "Overflow mémoire détecté",
                  status: Status.WARN,
                },
                {
                  text: "Impossible de stocker un Silure de 2,6m dans la mémoire.",
                  status: Status.ERROR,
                },
              ];
            case 5:
              return [
                { text: "Message de l'auteur trouvé.", status: Status.WARN },
                { text: "'WESH ? Un peu de respect.'", status: Status.ERROR },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Observation terminée. Animal identifié.",
            delay: 500,
          },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 3 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 4/5", delay: 200 },
          {
            text: "Inspection du module AsperGuessr...",
            delay: 600,
          },
          {
            text: "Identification du meilleur Guesser impossible.",
            delay: 600,
            status: Status.WARN,
          },
          {
            text: "Assistance nécessaire :",
            delay: 100,
            status: Status.WARN,
          },
        ],
        validate: (input: string) =>
          ["hanna", "anna", "hhanna", "hhhanna", "hannah"].includes(
            input.trim().toLowerCase()
          ),
        errorMessage: (input: string) => {
          return [
            {
              text: "L'entrée ne correspond à rien en mémoire...",
              status: Status.ERROR,
              delay: 500,
            },
            {
              text: "Peut-être s'agit-il d'une erreur d'orthographe ?",
              status: Status.INFO,
            },
          ];
        },
        result: [
          { text: "Identification correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 4 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 5/5", delay: 200 },
          {
            text: "Sujet : 'Escapade à EuropaPark'.",
            delay: 100,
          },
          {
            text: "Detection d'une JAM. Analyse de la playlist musicale...",
            delay: 600,
          },
          {
            text: "Ajout anormal détecté.",
            delay: 200,
            status: Status.WARN,
          },
          { text: "Fichier corrompu !", delay: 300, status: Status.ERROR },
          {
            text: "Suggestion de correspondance :",
            delay: 100,
            status: Status.WARN,
          },
        ],
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
          if (num > 0 && num < 5) {
            return [
              {
                text: `BANGER présent dans les éléments audios du séjour, mais inconnu de la JAM`,
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Correction appliquée. Fichier restauré.", delay: 500 },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 5 terminée.", delay: 500 },
        ],
      },
    ],
    yanou: [
      {
        question: [
          { text: "Démarrage de la récupération :", delay: 0 },
          { text: "Partition 1/5", delay: 600 },
          { text: "Recherche des autre participants...", delay: 1200 },
          {
            text: "Anomalie détectée: terme 'LE PUANT' rencontré",
            delay: 200,
            status: Status.WARN,
          },
          {
            text: "Association incomplète - assistance requise",
            delay: 200,
            status: Status.WARN,
          },
          {
            text: "Partition 1 : Identifiez la personne associée à 'LE PUANT'.",
          },
        ],
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLocaleLowerCase()),
        errorMessage: (input: string) => {
          return [
            {
              text: "Identification impossible. Réessayez.",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Association correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 1 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 2/5", delay: 200 },
          {
            text: "Exploration de la salle de jeux...",
            delay: 1200,
          },
          {
            text: "Intrusion détectée : élément excedentaire détecté.",
            delay: 300,
            status: Status.ERROR,
          },
          {
            text: "Assistance requise pour identification de l'intrus.",
            delay: 100,
            status: Status.WARN,
          },
        ],
        choices: [
          "Un billard",
          "Un baby-foot",
          "Du skill",
          "John Fitzgerald Kennedy",
          "Un jeu de fléchettes",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 3:
              return [
                {
                  text: "LOUEN semble être une preuve vivante qu'il y avait du skill.",
                  status: Status.ERROR,
                },
              ];
            case 5:
            case 1:
            case 2:
              return [
                {
                  text: "Il semble que cet élément soit bien présent en mémoire...",
                  status: Status.ERROR,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Jamais John Fitzgerald Kennedy n'aurait laissé faire ça... 🙅‍♂️ C'est-à-dire qu'il y a 42 millions d'ukrainiens 🇺🇦 70% sont des chrétiens ✝️ et le pape RESTE au Vatican 🏛️ AU LIEU D'ALLER À KIEV ??? 😡 et de dire TUEZ-MOI ☠️ Je représente le Christ ⛪️ JE REPRÉSENTE LE CHRIST 🙏",
            status: Status.ERROR,
          },
          { text: "Intrus identifié. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 2 terminée.", delay: 500 },
        ],
      },

      {
        question: [
          { text: "Partition 3/5", delay: 200 },
          {
            text: "Ecoute des enregistrements audio...",
            delay: 1200,
          },
          {
            text: "Incident détécté.",
            delay: 300,
            status: Status.ERROR,
          },
          {
            text: "Date: DAY 1",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Cause: Bruits et rires élevés.",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Conséquence: veste attrapée par voisins.",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Concerné: ~#@!$%* ",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Impossible de retrouver l'identité complète. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        choices: ["JESUS", "YANOU", "LOUEN", "MAC", "THOMAS"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 1;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num > 0 && num < 6) {
            return [
              {
                text: "Iel est lié.e à cette histoire mais iel ne s'est pas fait.e bully (cette fois).",
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Identification correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 3 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 4/5", delay: 200 },
          {
            text: "Sujet : 'Escapade à EuropaPark'.",
            delay: 100,
          },
          {
            text: "Detection d'une JAM. Analyse de la playlist musicale...",
            delay: 600,
          },
          {
            text: "Ajout anormal détecté.",
            delay: 200,
            status: Status.WARN,
          },
          { text: "Fichier corrompu !", delay: 300, status: Status.ERROR },
          {
            text: "Suggestion de correspondance :",
            delay: 100,
            status: Status.WARN,
          },
        ],
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
          if (num > 0 && num < 5) {
            return [
              {
                text: `BANGER présent dans les éléments audios du séjour, mais inconnu de la JAM`,
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Correction appliquée. Fichier restauré.", delay: 500 },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 4 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 5/5", delay: 200 },
          {
            text: "Incident détecté : Apéro perdu.",
            delay: 600,
            status: Status.ERROR,
          },
          { text: "Cause : - Inconnu -", delay: 100, status: Status.WARN },
          {
            text: "Conséquence : Jeu de piste",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Conclusion de l'incident : Apéro retrouvé ^£$%*-- ",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Impossible de reconstruire la conclusion. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        choices: [
          "-- dans le coffre de la voiture de YANOU",
          "-- dans ton cul",
          "-- dans le coffre de la voiture de LOUEN",
          "-- dans le coffre de MAC",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 3;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
              return [
                {
                  text: "YANOU ne semble pas avoir amené sa voiture...",
                  status: Status.ERROR,
                },
              ];
            case 2:
              return [
                {
                  text: "Fort heureusement je n'en possède pas.",
                  status: Status.ERROR,
                },
              ];
            case 4:
              return [
                { text: "Message de l'auteur trouvé.", status: Status.WARN },
                {
                  text: "'Rapport à la musique TAKAPTE ? Mais non.'",
                  status: Status.ERROR,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          { text: "Conclusion récupérée. Artefact restauré.", delay: 300 },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 5 terminée.", delay: 500 },
        ],
      },
    ],
    mac: [
      {
        question: [
          { text: "Démarrage de la récupération :", delay: 0 },
          { text: "Partition 1/5", delay: 600 },
          {
            text: "Incident détecté : Apéro perdu.",
            delay: 600,
            status: Status.ERROR,
          },
          { text: "Cause : - Inconnu -", delay: 100, status: Status.WARN },
          {
            text: "Conséquence : Jeu de piste",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Conclusion de l'incident : Apéro retrouvé ^£$%*-- ",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Impossible de reconstruire la conclusion. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        choices: [
          "-- dans le coffre de la voiture de YANOU",
          "-- dans ton cul",
          "-- dans le coffre de la voiture de LOUEN",
          "-- dans le coffre de MAC",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 3;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
              return [
                {
                  text: "YANOU ne semble pas avoir amené sa voiture...",
                  status: Status.ERROR,
                },
              ];
            case 2:
              return [
                {
                  text: "Fort heureusement je n'en possède pas.",
                  status: Status.ERROR,
                },
              ];
            case 4:
              return [
                { text: "Message de l'auteur trouvé.", status: Status.WARN },
                {
                  text: "'Rapport à la musique TAKAPTE ? Mais non.'",
                  status: Status.ERROR,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          { text: "Conclusion récupérée. Artefact restauré.", delay: 300 },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 1 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 2/5", delay: 200 },
          {
            text: "Recherche d'ingrédient de sublimation optimal...",
            delay: 600,
          },
          { text: "Avis objectif de 'LE PUANT'.", delay: 300 },
          {
            text: "Identification de l'élément nécessaire :",
            delay: 100,
            status: Status.WARN,
          },
        ],
        choices: ["Bière", "Parmesan", "Glace saveur - vanille -", "Houmous"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num == 2;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
            case 3:
              return [
                {
                  text: "Bien qu'une association soit liée, ça n'est pas le bon ingrédient.",
                  status: Status.ERROR,
                },
              ];
            case 4:
              return [
                {
                  text: "Le houmous est peut-être optimal pour la santé, mais pas pour la sublimation.",
                  status: Status.ERROR,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Sublimation réussie. Ingrédient optimal correct.",
            delay: 500,
          },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 2 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 3/5", delay: 200 },
          {
            text: "Apparté Barbecue",
            delay: 600,
          },
          { text: "Allumage : VRAI HOMME", delay: 100 },
          {
            text: "Impossible de d'identifier 'VRAI HOMME'. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        choices: ["Jesus", "Merlinou", "Yanou", "Louen", "AP", "TOMA"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 5;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num > 0 && num < 7) {
            return [
              {
                text: "Incorrect. ce n'est pas le bon homme.",
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Identification correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 3 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 4/5", delay: 200 },
          {
            text: "Sujet : 'Escapade à EuropaPark'.",
            delay: 100,
          },
          {
            text: "Identification des attractions...",
            delay: 600,
          },
          {
            text: "Entrée non reconnue: Attraction de départ.",
            delay: 600,
            status: Status.ERROR,
          },
          {
            text: "Identification de l'attraction requise.",
            delay: 600,
            status: Status.ERROR,
          },
        ],
        choices: ["Blue Fire", "Silver Star", "Voltron", "Eurosat"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num > 0 && num < 5) {
            return [
              {
                text: `Fffsshhhht ! ~rollrollroll~ Ce n'est pas la bonne attraction...`,
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Attraction identifiée. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 4 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 5/5", delay: 200 },
          { text: "Entité CDHV identifiée", delay: 100 },
          { text: "CDHV : Confiserie Des Hautes-Vosges", delay: 200 },
          { text: "Inspection des achats", delay: 300 },
          {
            text: "Anomalie détectée : Achat excessif",
            delay: 300,
            status: Status.WARN,
          },
          {
            text: "Assistance requise pour quantification.",
            delay: 100,
            status: Status.WARN,
          },
        ],
        choices: [
          "moins de 5 deniers",
          "un smic",
          "environ deux smics",
          "entre 5 deniers et un smic",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 2:
              return [
                {
                  text: "Abuse...",
                  status: Status.ERROR,
                },
              ];
            case 3:
              return [
                {
                  text: "T'es marseillais toi non ? Fratéé",
                  status: Status.ERROR,
                },
              ];
            case 1:
              return [
                {
                  text: "Les deniers ne sont plus en vigueur depuis l'an 7, à une vache pré.",
                  status: Status.ERROR,
                },
                {
                  text: "Et de toute façon, qu'allez-vous faire de tout ces deniers ?",
                  status: Status.WARN,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Quantification terminée. Mémoire synchronisée.",
            delay: 300,
          },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 5 terminée.", delay: 500 },
        ],
      },
    ],
    louen: [
      {
        question: [
          { text: "Démarrage de la récupération :", delay: 0 },
          { text: "Partition 1/5", delay: 600 },
          { text: "Recherche des autre participants...", delay: 1200 },
          {
            text: "Anomalie détectée: terme 'LE RONFLEUR' rencontré",
            delay: 200,
            status: Status.WARN,
          },
          {
            text: "Association incomplète - assistance requise",
            delay: 200,
            status: Status.WARN,
          },
          {
            text: "Partition 1 : Identifiez la personne associée à 'LE RONFLEUR'.",
          },
        ],
        validate: (input: string) =>
          ["yanou", "yann", "yannou", "le ronfleur"].includes(
            input.trim().toLocaleLowerCase()
          ),
        errorMessage: (input: string) => {
          return [
            {
              text: "Identification impossible. Réessayez.",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Association correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 1 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 2/5", delay: 200 },
          {
            text: "Sujet : 'Escapade à EuropaPark'.",
            delay: 100,
          },
          {
            text: "Identification des attractions...",
            delay: 600,
          },
          {
            text: "Entrée non reconnue: Attraction de départ.",
            delay: 600,
            status: Status.ERROR,
          },
          {
            text: "Identification de l'attraction requise.",
            delay: 600,
            status: Status.ERROR,
          },
        ],
        choices: ["Blue Fire", "Silver Star", "Voltron", "Eurosat"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num > 0 && num < 5)
            return [
              {
                text: `Fffsshhhht ! ~rollrollroll~ Ce n'est pas la bonne attraction...`,
                status: Status.ERROR,
              },
            ];
          else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Attraction identifiée. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 2 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 3/5", delay: 200 },
          {
            text: "Exploration de la salle de jeux...",
            delay: 1200,
          },
          {
            text: "Intrusion détectée : élément excedentaire détecté.",
            delay: 300,
            status: Status.ERROR,
          },
          {
            text: "Assistance requise pour identification de l'intrus.",
            delay: 100,
            status: Status.WARN,
          },
        ],
        choices: [
          "Un billard",
          "Un baby-foot",
          "Du skill",
          "John Fitzgerald Kennedy",
          "Un jeu de fléchettes",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 3:
              return [
                {
                  text: "LOUEN semble être une preuve vivante qu'il y avait du skill.",
                  status: Status.ERROR,
                },
              ];
            case 5:
            case 1:
            case 2:
              return [
                {
                  text: "Il semble que cet élément soit bien présent en mémoire...",
                  status: Status.ERROR,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Jamais John Fitzgerald Kennedy n'aurait laissé faire ça... 🙅‍♂️ C'est-à-dire qu'il y a 42 millions d'ukrainiens 🇺🇦 70% sont des chrétiens ✝️ et le pape RESTE au Vatican 🏛️ AU LIEU D'ALLER À KIEV ??? 😡 et de dire TUEZ-MOI ☠️ Je représente le Christ ⛪️ JE REPRÉSENTE LE CHRIST 🙏",
            status: Status.ERROR,
          },
          { text: "Intrus identifié. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 3 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 4/5", delay: 200 },
          {
            text: "Sujet : 'Escapade à EuropaPark'.",
            delay: 100,
          },
          {
            text: "Detection d'une JAM. Analyse de la playlist musicale...",
            delay: 600,
          },
          {
            text: "Ajout anormal détecté.",
            delay: 200,
            status: Status.WARN,
          },
          { text: "Fichier corrompu !", delay: 300, status: Status.ERROR },
          {
            text: "Suggestion de correspondance :",
            delay: 100,
            status: Status.WARN,
          },
        ],
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
          if (num > 0 && num < 5) {
            return [
              {
                text: `BANGER présent dans les éléments audios du séjour, mais inconnu de la JAM`,
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Correction appliquée. Fichier restauré.", delay: 500 },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 4 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 5/5", delay: 200 },
          { text: "Localisation du séjour", delay: 100 },
          { text: "Pays : France", delay: 200 },
          { text: "Région : Hautes-Vosges", delay: 300 },
          { text: "Ville : ~#@!$%* ", delay: 100, status: Status.WARN },
          { text: "Entrée corrompue !", delay: 300, status: Status.ERROR },
          {
            text: "Impossible de retrouver la ville exacte. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        validate: (input: string) =>
          ["xonrupt-longemer", "xonrupt longemer"].includes(
            input.trim().toLowerCase()
          ),
        errorMessage: (input: string) => {
          return [
            {
              text: "Ville non reconnue. Veuillez réessayer.",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Localisation retrouvée. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 5 terminée.", delay: 500 },
        ],
      },
    ],
    blini: [
      {
        question: [
          { text: "Démarrage de la récupération :", delay: 0 },
          { text: "Partition 1/5", delay: 600 },
          {
            text: "Analyse de la faune locale autour du lac...",
            delay: 600,
          },
          {
            text: "Identification de l'animal observé nécessaire pour validation mémoire.",
            delay: 300,
            status: Status.WARN,
          },
        ],
        choices: [
          "Imbrication Turducken",
          "Une Silure de 2,6m",
          "DES CANARDS",
          "COIN~han~",
          "AP",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && (num == 3 || num == 4);
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
              return [
                {
                  text: "Un Turducken est bien imbriqué dans la mémoire, mais il ne semble pas être lié au lac.",
                  status: Status.ERROR,
                },
              ];
            case 2:
              return [
                {
                  text: "Overflow mémoire détecté",
                  status: Status.ERROR,
                },
                {
                  text: "Impossible de stocker un Silure de 2,6m dans la mémoire.",
                  status: Status.ERROR,
                },
              ];
            case 5:
              return [
                { text: "Message de l'auteur trouvé.", status: Status.WARN },
                { text: "'WESH ? Un peu de respect.'", status: Status.ERROR },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Observation terminée. Animal identifié.",
            delay: 500,
          },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 1 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 2/5", delay: 200 },
          {
            text: "Apparté Barbecue",
            delay: 600,
          },
          { text: "Allumage : VRAI HOMME", delay: 100 },
          {
            text: "Impossible de d'identifier 'VRAI HOMME'. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        choices: ["Jesus", "Merlinou", "Yanou", "Louen", "AP", "TOMA"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 5;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num > 0 && num < 7) {
            return [
              {
                text: "Incorrect. ce n'est pas le bon homme.",
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Identification correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 2 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 3/5", delay: 200 },
          { text: "Activité: Escape Game", delay: 200 },
          { text: "Thème: Apéro", delay: 200 },
          { text: "Durée: ----", delay: 800, status: Status.WARN },
          {
            text: "Impossible d'estimer la durée approximative. Intervention requise.",
            delay: 200,
            status: Status.WARN,
          },
        ],
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
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
              return [
                {
                  text: "Cette durée semble trop courte non ?",
                  status: Status.ERROR,
                },
              ];
            case 3:
              return [
                {
                  text: "Seriez-vous -par pur hasard- Marseillais ?.",
                  status: Status.ERROR,
                },
              ];
            case 4:
              return [
                { text: "Il semble que vous abusiez.", status: Status.ERROR },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          { text: "Durée estimée. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 3 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 4/5", delay: 200 },
          { text: "Anniversaire détecté !", delay: 400 },
          { text: "Analyse des participants...", delay: 800 },
          {
            text: "Entrée incomplète : Nom du célébré manquant.",
            delay: 100,
            status: Status.ERROR,
          },
          { text: "Identification requise.", delay: 100, status: Status.ERROR },
        ],
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLowerCase()),
        errorMessage: (input: string) => {
          return [
            {
              text: "Ce n'est pas la bonne personne. Réessaie !",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Identification correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1000 },
          { text: "Partition 4 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 5/5", delay: 200 },
          { text: "Entité CDHV identifiée", delay: 100 },
          { text: "CDHV : Confiserie Des Hautes-Vosges", delay: 200 },
          { text: "Inspection des achats", delay: 300 },
          {
            text: "Anomalie détectée : Achat excessif",
            delay: 300,
            status: Status.WARN,
          },
          {
            text: "Assistance requise pour quantification.",
            delay: 100,
            status: Status.WARN,
          },
        ],
        choices: [
          "moins de 5 deniers",
          "un smic",
          "environ deux smics",
          "entre 5 deniers et un smic",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 2:
              return [
                {
                  text: "Abuse...",
                  status: Status.ERROR,
                },
              ];
            case 3:
              return [
                {
                  text: "T'es marseillais toi non ? Fratéé",
                  status: Status.ERROR,
                },
              ];
            case 1:
              return [
                {
                  text: "Les deniers ne sont plus en vigueur depuis l'an 7, à une vache pré.",
                  status: Status.ERROR,
                },
                {
                  text: "Et de toute façon, qu'allez-vous faire de tout ces deniers ?",
                  status: Status.WARN,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Quantification terminée. Mémoire synchronisée.",
            delay: 300,
          },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 5 terminée.", delay: 500 },
        ],
      },
    ],
    ap: [
      {
        question: [
          { text: "Démarrage de la récupération :", delay: 0 },
          { text: "Partition 1/5", delay: 600 },
          {
            text: "Analyse de la faune locale autour du lac...",
            delay: 600,
          },
          {
            text: "Identification de l'animal observé nécessaire pour validation mémoire.",
            delay: 300,
            status: Status.WARN,
          },
        ],
        choices: [
          "Imbrication Turducken",
          "Une Silure de 2,6m",
          "DES CANARDS",
          "COIN~han~",
          "AP",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && (num == 3 || num == 4);
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
              return [
                {
                  text: "Un Turducken est bien imbriqué dans la mémoire, mais il ne semble pas être lié au lac.",
                  status: Status.ERROR,
                },
              ];
            case 2:
              return [
                {
                  text: "Overflow mémoire détecté",
                  status: Status.ERROR,
                },
                {
                  text: "Impossible de stocker un Silure de 2,6m dans la mémoire.",
                  status: Status.ERROR,
                },
              ];
            case 5:
              return [
                { text: "Message de l'auteur trouvé.", status: Status.WARN },
                { text: "'WESH ? Un peu de respect.'", status: Status.ERROR },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Observation terminée. Animal identifié.",
            delay: 500,
          },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 1 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 2/5", delay: 200 },
          { text: "Localisation du séjour", delay: 100 },
          { text: "Pays : France", delay: 200 },
          { text: "Région : Hautes-Vosges", delay: 300 },
          { text: "Ville : ~#@!$%* ", delay: 100, status: Status.WARN },
          { text: "Entrée corrompue !", delay: 300, status: Status.ERROR },
          {
            text: "Impossible de retrouver la ville exacte. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        validate: (input: string) =>
          ["xonrupt-longemer", "xonrupt longemer"].includes(
            input.trim().toLowerCase()
          ),
        errorMessage: (input: string) => {
          return [
            {
              text: "Ville non reconnue. Veuillez réessayer.",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Localisation retrouvée. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 2 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 3/5", delay: 200 },
          { text: "Activité: Escape Game", delay: 200 },
          { text: "Thème: Apéro", delay: 200 },
          { text: "Durée: ----", delay: 800, status: Status.WARN },
          {
            text: "Impossible d'estimer la durée approximative. Intervention requise.",
            delay: 200,
            status: Status.WARN,
          },
        ],
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
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
              return [
                {
                  text: "Cette durée semble trop courte non ?",
                  status: Status.ERROR,
                },
              ];
            case 3:
              return [
                {
                  text: "Seriez-vous -par pur hasard- Marseillais ?.",
                  status: Status.ERROR,
                },
              ];
            case 4:
              return [
                { text: "Il semble que vous abusiez.", status: Status.ERROR },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          { text: "Durée estimée. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 3 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 4/5", delay: 200 },
          { text: "Anniversaire détecté !", delay: 400 },
          { text: "Analyse des participants...", delay: 800 },
          {
            text: "Entrée incomplète : Nom du célébré manquant.",
            delay: 100,
            status: Status.ERROR,
          },
          { text: "Identification requise.", delay: 100, status: Status.ERROR },
        ],
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLowerCase()),
        errorMessage: (input: string) => {
          return [
            {
              text: "Ce n'est pas la bonne personne. Réessaie !",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Identification correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1000 },
          { text: "Partition 4 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 5/5", delay: 200 },
          {
            text: "Ecoute des enregistrements audio...",
            delay: 1200,
          },
          {
            text: "Incident détécté.",
            delay: 300,
            status: Status.ERROR,
          },
          {
            text: "Date: DAY 1",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Cause: Bruits et rires élevés.",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Conséquence: veste attrapée par voisins.",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Concerné: ~#@!$%* ",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Impossible de retrouver l'identité complète. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        choices: ["JESUS", "YANOU", "LOUEN", "MAC", "THOMAS"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 1;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num > 0 && num < 6) {
            return [
              {
                text: "Iel est lié.e à cette histoire mais iel ne s'est pas fait.e bully (cette fois).",
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Identification correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 5 terminée.", delay: 500 },
        ],
      },
    ],
    thomas: [
      {
        question: [
          { text: "Démarrage de la récupération :", delay: 0 },
          { text: "Partition 1/5", delay: 600 },
          { text: "Recherche des autre participants...", delay: 1200 },
          {
            text: "Anomalie détectée: terme 'LE PUANT' rencontré",
            delay: 200,
            status: Status.WARN,
          },
          {
            text: "Association incomplète - assistance requise",
            delay: 200,
            status: Status.WARN,
          },
          {
            text: "Partition 1 : Identifiez la personne associée à 'LE PUANT'.",
          },
        ],
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLocaleLowerCase()),
        errorMessage: (input: string) => {
          return [
            {
              text: "Identification impossible. Réessayez.",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Association correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 1 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 2/5", delay: 200 },
          { text: "Anniversaire détecté !", delay: 400 },
          { text: "Analyse des participants...", delay: 800 },
          {
            text: "Entrée incomplète : Nom du célébré manquant.",
            delay: 100,
            status: Status.ERROR,
          },
          { text: "Identification requise.", delay: 100, status: Status.ERROR },
        ],
        validate: (input: string) =>
          ["louen", "le puant"].includes(input.trim().toLowerCase()),
        errorMessage: (input: string) => {
          return [
            {
              text: "Ce n'est pas la bonne personne. Réessaie !",
              status: Status.ERROR,
            },
          ];
        },
        result: [
          { text: "Identification correcte. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1000 },
          { text: "Partition 2 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 3/5", delay: 200 },
          {
            text: "Sujet : 'Escapade à EuropaPark'.",
            delay: 100,
          },
          {
            text: "Identification des attractions...",
            delay: 600,
          },
          {
            text: "Entrée non reconnue: Attraction de départ.",
            delay: 600,
            status: Status.ERROR,
          },
          {
            text: "Identification de l'attraction requise.",
            delay: 600,
            status: Status.ERROR,
          },
        ],
        choices: ["Blue Fire", "Silver Star", "Voltron", "Eurosat"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 4;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          if (num > 0 && num < 5) {
            return [
              {
                text: `Fffsshhhht ! ~rollrollroll~ Ce n'est pas la bonne attraction...`,
                status: Status.ERROR,
              },
            ];
          } else {
            return [
              {
                text: "Identifiant non reconnu. Veuillez réessayer.",
                status: Status.ERROR,
              },
            ];
          }
        },
        result: [
          { text: "Attraction identifiée. Mémoire synchronisée." },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 3 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 4/5", delay: 200 },
          {
            text: "Recherche d'ingrédient de sublimation optimal...",
            delay: 600,
          },
          { text: "Avis objectif de 'LE PUANT'.", delay: 300 },
          {
            text: "Identification de l'élément nécessaire :",
            delay: 100,
            status: Status.WARN,
          },
        ],
        choices: ["Bière", "Parmesan", "Glace saveur - vanille -", "Houmous"],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num == 2;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
            case 3:
              return [
                {
                  text: "Bien qu'une association soit liée, ça n'est pas le bon ingrédient.",
                  status: Status.ERROR,
                },
              ];
            case 4:
              return [
                {
                  text: "Le houmous est peut-être optimal pour la santé, mais pas pour la sublimation.",
                  status: Status.ERROR,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          {
            text: "Sublimation réussie. Ingrédient optimal correct.",
            delay: 500,
          },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 4 terminée.", delay: 500 },
        ],
      },
      {
        question: [
          { text: "Partition 5/5", delay: 600 },
          {
            text: "Incident détecté : Apéro perdu.",
            delay: 600,
            status: Status.ERROR,
          },
          { text: "Cause : - Inconnu -", delay: 100, status: Status.WARN },
          {
            text: "Conséquence : Jeu de piste",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Conclusion de l'incident : Apéro retrouvé ^£$%*-- ",
            delay: 100,
            status: Status.WARN,
          },
          {
            text: "Impossible de reconstruire la conclusion. Assistance requise.",
            delay: 100,
            status: Status.ERROR,
          },
        ],
        choices: [
          "-- dans le coffre de la voiture de YANOU",
          "-- dans ton cul",
          "-- dans le coffre de la voiture de LOUEN",
          "-- dans le coffre de MAC",
        ],
        validate: (input: string) => {
          const num = parseInt(input.trim(), 10);
          return !isNaN(num) && num === 3;
        },
        errorMessage: (input: string) => {
          const num = parseInt(input.trim(), 10);
          switch (num) {
            case 1:
              return [
                {
                  text: "YANOU ne semble pas avoir amené sa voiture...",
                  status: Status.ERROR,
                },
              ];
            case 2:
              return [
                {
                  text: "Fort heureusement je n'en possède pas.",
                  status: Status.ERROR,
                },
              ];
            case 4:
              return [
                { text: "Message de l'auteur trouvé.", status: Status.WARN },
                {
                  text: "'Rapport à la musique TAKAPTE ? Mais non.'",
                  status: Status.ERROR,
                },
              ];
            default:
              return [
                {
                  text: "Identifiant non reconnu. Veuillez réessayer.",
                  status: Status.ERROR,
                },
              ];
          }
        },
        result: [
          { text: "Conclusion récupérée. Artefact restauré.", delay: 300 },
          { text: "Reprise de la récupération...", delay: 1500 },
          { text: "Partition 5 terminée.", delay: 500 },
        ],
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

  // Commande spéciale pour bypass toutes les questions
  commands.set("bypass", {
    description: "Bypass toutes les questions et affiche la fin",
    run: async (_, ctx) => {
      ctx.state.started = true;
      ctx.state.step = steps.length;
      ctx.state.awaitingAnswer = false;
      return outro;
    },
  });

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
      ];
      return lines;
    },
  });

  commands.set("status", {
    description: "Check progress",
    run: (_, ctx) => {
      if (!ctx.state.started) return ["Recovery not started. Type 'start'."];
      const lines = [`Current step: ${ctx.state.step + 1} / ${steps.length}`];
      if (ctx.state.awaitingAnswer) {
        lines.push("En attente d'assistance.");
        lines.push(...getQuestionLines(steps[ctx.state.step]));
      } else if (ctx.state.step >= steps.length) {
        lines.push("Recovery complete!");
      } else {
        lines.push("Prêt à continuer.");
      }
      return lines;
    },
  });

  commands.set("answer", {
    description: "Answer the current question",
    run: (args, ctx) => {
      if (!ctx.state.started) return ["Please start the recovery first."];
      if (!ctx.state.awaitingAnswer)
        return ["No assistance is required right now."];

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
          console.log("Selected name:", step);

          if (step.storeResult) step.storeResult(userAnswer, ctx);
          ctx.state.steps =
            questionSets[ctx.state.selectedName.toLocaleLowerCase()] ||
            defaultSteps;
          ctx.state.name = ctx.state.selectedName;
          ctx.state.step = 0; // Start at the first question of the selected set
          ctx.state.awaitingAnswer = true;
          console.log("Assigned steps:", ctx.state.steps);

          return [
            `Bienvenue ${ctx.state.name}!`,
            ...getQuestionLines(ctx.state.steps[ctx.state.step]),
          ];
        } else {
          // Only show the last line of the question (plus choices)
          const qLines = getQuestionLines(step);
          const lastLine =
            qLines[
              qLines.length - (step.choices ? step.choices.length + 1 : 1)
            ];
          let linesToShow = [];
          if (step.choices) {
            linesToShow = [lastLine, ...qLines.slice(-step.choices.length)];
          } else {
            linesToShow = [lastLine];
          }
          if (step.errorMessage) {
            return [...step.errorMessage(userAnswer), ...linesToShow];
          }
          return [
            { text: "Incorrect, réessayez", status: Status.ERROR },
            ...linesToShow,
          ];
        }
      }

      if (step.validate(userAnswer)) {
        if (step.storeResult) step.storeResult(userAnswer, ctx);
        // Show result if present
        let resultMsg = step.result
          ? Array.isArray(step.result)
            ? step.result
            : [step.result]
          : ["Correct!"];
        ctx.state.step++;
        ctx.state.awaitingAnswer = ctx.state.step < activeSteps.length;

        if (ctx.state.step < activeSteps.length) {
          return [
            ...resultMsg,
            ...getQuestionLines(activeSteps[ctx.state.step]),
            "Type your answer:",
          ];
        } else {
          return [...resultMsg, ...outro];
        }
      } else {
        // Only show the last line of the question (plus choices)
        const qLines = getQuestionLines(step);
        const lastLine =
          qLines[qLines.length - (step.choices ? step.choices.length + 1 : 1)];
        let linesToShow = [];
        if (step.choices) {
          linesToShow = [lastLine, ...qLines.slice(-step.choices.length)];
        } else {
          linesToShow = [lastLine];
        }
        if (step.errorMessage) {
          return [...step.errorMessage(userAnswer), ...linesToShow];
        }
        return ["Incorrect. Try again.", ...linesToShow];
      }
    },
  });

  return {
    commands,
    state,
  };
}
