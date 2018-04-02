import Phaser from 'phaser-ce';
/* tslint:disable-next-line:no-implicit-dependencies */
import PhaserSuperStorage from 'phaserSuperStorage';

export default interface IGame extends Phaser.Game {
  storage: PhaserSuperStorage.StoragePlugin;
};
