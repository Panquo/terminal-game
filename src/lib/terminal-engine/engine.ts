type CommandHandler = (command: string) => string[] | Promise<string[]>;

export function createEngine(gameLogic: CommandHandler): CommandHandler {
  return async (command: string) => {
    return await gameLogic(command);
  };
}
