import { Mediator } from '@koreez/pure-mvc';
import BaseState from './BaseState';

export default abstract class BaseStateMediator extends Mediator {
  constructor(name: string, viewComponent: BaseState) {
    super(name, viewComponent);
    this.viewComponent.onStart.add(this.onStateStart, this);
    this.viewComponent.onReady.add(this.onStateReady, this);
    this.viewComponent.onShutdown.add(this.onStateShutdown, this);
  }

  private onStateStart(): void {
    this.sendNotification(this.viewComponent.constructor['START']);
  }

  private onStateReady(): void {
    this.sendNotification(this.viewComponent.constructor['READY']);
  }

  private onStateShutdown(): void {
    this.viewComponent.onStart.remove(this.onStateStart, this);
    this.viewComponent.onReady.remove(this.onStateReady, this);
    this.viewComponent.onShutdown.remove(this.onStateShutdown, this);
    this.sendNotification(this.viewComponent.constructor['SHUTDOWN']);
  }
}
