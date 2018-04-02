import Phaser from 'phaser-ce';
import { ILabelObjectCreator, ILabelObjectFactory } from '../utils/Utils';
import IGame from '../IGame';
import GameConfig from '../constants/GameConfig';

export default class BaseState extends Phaser.State {
  public onStart: Phaser.Signal;
  public onReady: Phaser.Signal;
  public onShutdown: Phaser.Signal;
  public add: ILabelObjectFactory;
  public make: ILabelObjectCreator;
  public game: IGame;

  protected name: string;

  constructor(name: string) {
    super();
    this.name = name;
    (this.constructor as any)['START'] = `${name}Start`;
    (this.constructor as any)['READY'] = `${name}Ready`;
    (this.constructor as any)['SHUTDOWN'] = `${name}Shutdown`;
    this.onStart = new Phaser.Signal();
    this.onReady = new Phaser.Signal();
    this.onShutdown = new Phaser.Signal();
  }

  public init(...args: any[]): void {
    super.init(args);
    this.stage.backgroundColor = GameConfig.backgroundColor;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.game.renderer.renderSession.roundPixels = true;
    this.onStart.dispatch();
  }

  public create(game: Phaser.Game): void {
    super.create(game);
    this.onReady.dispatch();
  }

  public shutdown(game: Phaser.Game): void {
    super.shutdown(game);
    this.onShutdown.dispatch();
  }
}
