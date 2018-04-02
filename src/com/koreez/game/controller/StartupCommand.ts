import { SyncMacroCommand } from '@koreez/pure-mvc';

export default class StartupCommand extends SyncMacroCommand<StartupCommand> {
  public execute(): void {}

  protected initializeMacroCommand(): void {}
}
