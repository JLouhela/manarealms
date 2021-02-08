import log = require("loglevel");
import { Deck, Cards } from "../card/deck";
import { Constants } from "../../utils/constants";

export class PlayerState {
  _playerDeck: Deck;
  _playerHand: Cards;
  _mana: number;
  _hp: number;
  _events: Phaser.Events.EventEmitter;

  constructor() {
    this._playerDeck = null;
    this._playerHand = null;
    this._mana = 0;
    this._hp = 50;
  }

  init(playerDeck: Deck, eventEmitter: Phaser.Events.EventEmitter): void {
    log.debug("Init new player state");
    this._playerDeck = playerDeck;
    this._events = eventEmitter;
    this._playerHand = [];
    this._mana = 0;
    this._hp = 50;
  }

  get deck(): Deck {
    return this._playerDeck;
  }

  get hand(): Cards {
    return this._playerHand;
  }

  get mana(): number {
    return this._mana;
  }

  get hp(): number {
    return this._hp;
  }

  addMana(n: number) {
    this._mana += n;
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  decreaseMana(n: number) {
    this._mana -= n;
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  decreaseHp(n: number) {
    this._hp -= n;
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  addHp(n: number) {
    this._hp += n;
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  resetMana() {
    this._mana = 0;
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }
}
