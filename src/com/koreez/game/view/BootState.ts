import Phaser from 'phaser-ce';
import BaseState from './BaseState';

export default class BootState extends BaseState {
  public static NAME: string = 'BootState';

  constructor() {
    super(BootState.NAME);
  }

  public preload(game: Phaser.Game): void {
    super.preload(game);
    this.game.load.image('mushroom', 'assets/mushroom.png');
  }

  public create(game: Phaser.Game): void {
    super.create(game);
  }
}
