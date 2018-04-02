import '@babel/polyfill';
import 'whatwg-fetch';
import { Facade } from '@koreez/pure-mvc';
import 'pixi';
import Phaser from 'phaser-ce';
import PhaserI18n from 'phaseri18next';
import PhaserNineSlice from 'phaserNineSlice';
import PhaserSpine from 'phaserSpine';
import PhaserSuperStorage from 'phaserSuperStorage';
import GameFacade from './GameFacade';
import IGame from './IGame';
import './utils/Utils';
import GameConfig from './constants/GameConfig';

class Game extends Phaser.Game implements IGame {
  private static NAME: string = 'Game';
  public storage: PhaserSuperStorage.StoragePlugin;

  constructor() {
    super(
      GameConfig.gameWidth,
      GameConfig.gameHeight,
      Phaser.CANVAS,
      'gameContainer',
    );
    Facade.getInstance = GameFacade.getInstance;
    Facade.getInstance(Game.NAME);
    setTimeout(() => {
      this.initPlugins();
    }, 1);
  }

  public initPlugins(): void {
    if (!this.isBooted) {
      setTimeout(this.initPlugins.bind(this), 1);
      console.warn('_Phaser PluginManager Initializing is in PROCESS...');
      return;
    }
    console.log('_Phaser PluginManager Initializign DONE!');
    this.plugins.add(PhaserNineSlice.Plugin);
    this.plugins.add(PhaserSuperStorage.StoragePlugin);
    this.plugins.add(PhaserSpine.SpinePlugin);
    this.plugins.add(PhaserI18n.Plugin, {
      fallbackLng: 'en',
      backend: {
        loadPath: 'assets/locales/{{lng}}.json',
      },
      // preload: ['hy', 'ru']
    });
  }
}

(window as any).game = new Game();
