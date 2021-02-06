import log = require("loglevel");
import { Deck, Cards } from "../card/deck";

export class PlayerState {
  _playerDeck: Deck;
  _playerHand: Cards;
  _mana: number;
  _hp: number;

  constructor() {
    this._playerDeck = null;
    this._playerHand = null;
    this._mana = 0;
    this._hp = 50;
  }

  init(playerDeck: Deck): void {
    log.debug("Init new player state");
    this._playerDeck = playerDeck;
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
  }

  decreaseMana(n: number) {
    this._mana -= n;
  }

  decreaseHp(n: number) {
    this._hp -= n;
  }

  addHp(n: number) {
    this._hp += n;
  }

  resetMana() {
    this._mana = 0;
  }
}
