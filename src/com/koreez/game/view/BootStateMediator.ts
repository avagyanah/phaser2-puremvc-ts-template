import GameFacade from '../GameFacade';
import BaseState from './BaseState';
import BaseStateMediator from './BaseStateMediator';
import BootState from './BootState';

export default class BootStateMediator extends BaseStateMediator {
  public static NAME: string = 'BootStateMediator';

  constructor(viewComponent: BaseState) {
    super(BootStateMediator.NAME, viewComponent);
  }

  public listNotificationInterests(): string[] {
    return [GameFacade.STARTUP];
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case GameFacade.STARTUP:
        (window as any).game.state.start(BootState.NAME, true, false);
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }
}
