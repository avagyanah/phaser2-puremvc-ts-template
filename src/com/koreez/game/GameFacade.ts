import { Facade } from '@koreez/pure-mvc';
import StartupCommand from './controller/StartupCommand';
import BootState from './view/BootState';
import BootStateMediator from './view/BootStateMediator';
import GameState from './view/GameState';
import GameStateMediator from './view/GameStateMediator';

const consoleArgs: string[] = [
  ``,
  `background: ${'#c8c8ff'}`,
  `background: ${'#9696ff'}`,
  `color: ${'#ffffff'}; background: ${'#0000ff'};`,
  `background: ${'#9696ff'}`,
  `background: ${'#c8c8ff'}`,
];

export default class GameFacade extends Facade {
  public static NAME: string = 'GameFacade';
  public static STARTUP: string = `${GameFacade.NAME}StartUp`;

  public static getInstance(key: string): Facade {
    if (!Facade.instanceMap[key]) {
      Facade.instanceMap[key] = new GameFacade(key);
    }
    return Facade.instanceMap[key];
  }

  constructor(key: string) {
    super(key);
  }

  public initializeFacade(): void {
    setTimeout(() => {
      this.internalInitializeFacade();
    }, 100);
  }

  public sendNotification(notificationName: string, ...args: any[]): void {
    consoleArgs[0] = `%c %c %c ${notificationName}${
      args.length > 0 ? ' | ' + args : ''
    } %c %c `;
    console.log.apply(console, consoleArgs);
    super.sendNotification(notificationName, ...args);
  }

  protected initializeModel(): void {
    super.initializeModel();
  }

  protected initializeController(): void {
    super.initializeController();
    this.registerCommand(GameFacade.STARTUP, StartupCommand);
  }

  protected initializeView(): void {
    super.initializeView();
    (window as any).game.state.add(BootState.NAME, BootState);
    (window as any).game.state.add(GameState.NAME, GameState);

    this.registerMediator(
      new BootStateMediator((window as any).game.state.states[BootState.NAME]),
    );

    this.registerMediator(
      new GameStateMediator((window as any).game.state.states[GameState.NAME]),
    );
  }

  private startup(): void {
    this.sendNotification(GameFacade.STARTUP);
  }

  private internalInitializeFacade(): void {
    super.initializeFacade();
    this.startup();
  }
}
