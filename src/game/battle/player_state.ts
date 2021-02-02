import log = require("loglevel");
import { Deck, Cards } from "../card/deck";

export class PlayerState {
  _playerDeck: Deck;
  _playerHand: Cards;
  _mana: number;

  constructor() {
    this._playerDeck = null;
    this._playerHand = null;
    this._mana = 0;
  }

  init(playerDeck: Deck): void {
    log.debug("Init new player state");
    this._playerDeck = playerDeck;
    this._playerHand = [];
    this._mana = 0;
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

  addMana(n: number) {
    this._mana += n;
  }

  decreaseMana(n: number) {
    this._mana -= n;
  }

  resetMana() {
    this._mana = 0;
  }
}
