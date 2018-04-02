import Phaser from 'phaser-ce';
import BaseState from './BaseState';

export default class GameState extends BaseState {
  public static NAME: string = 'GameState';

  private mushroom!: Phaser.Sprite;

  constructor() {
    super(GameState.NAME);
  }

  public create(): void {
    this.mushroom = this.game.add.sprite(
      this.world.centerX,
      this.world.centerY,
      'mushroom',
    );
    this.mushroom.anchor.setTo(0.5);
  }

  public update(): void {
    this.mushroom.angle++;
  }

  public render(): void {
    if (process.env.NODE_ENV === 'development') {
      this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }
}
