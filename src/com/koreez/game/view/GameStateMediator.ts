import BaseState from './BaseState';
import BaseStateMediator from './BaseStateMediator';
import BootState from './BootState';
import GameState from './GameState';

export default class GameStateMediator extends BaseStateMediator {
  public static NAME: string = 'GameStateMediator';

  constructor(viewComponent: BaseState) {
    super(GameStateMediator.NAME, viewComponent);
  }

  public listNotificationInterests(): string[] {
    return [(BootState as any)['READY']];
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case (BootState as any)['READY']:
        (window as any).game.state.start(GameState.NAME, true, false);
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }
}
