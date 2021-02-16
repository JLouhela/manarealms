import log = require("loglevel");
import { Deck, Cards } from "../card/deck";
import { Card } from "../card/card";
import { Constants } from "../../utils/constants";

export class PlayerState {
  _playerDeck: Deck;
  _playerHand: Cards;
  _mana: number;
  _committedMana: number;
  _committedManaPerTurn: number;
  _hp: number;
  _events: Phaser.Events.EventEmitter;

  constructor() {
    this._playerDeck = null;
    this._playerHand = null;
    this._mana = 0;
    this._committedMana = 0;
    this._committedManaPerTurn = 0;
    this._hp = 50;
  }

  init(playerDeck: Deck, eventEmitter: Phaser.Events.EventEmitter): void {
    log.debug("Init new player state");
    this._playerDeck = playerDeck;
    this._events = eventEmitter;
    this._playerHand = [];
    this._mana = 0;
    this._committedMana = 0;
    this._committedManaPerTurn = 0;
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

  get committedMana(): number {
    return this._committedMana;
  }

  get committedManaPerTurn(): number {
    return this._committedManaPerTurn;
  }

  get hp(): number {
    return this._hp;
  }

  addMana(n: number) {
    this._mana += n;
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  addCommittedMana(n: number) {
    this._committedManaPerTurn += n;
    // Design question: committed mana active immediately?
    this._committedMana += n;
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  decreasePlayMana(n: number) {
    // Prioritize commit mana for playing, spend regular if not enough
    let remainder = this._committedMana - n;
    this._committedMana = Math.max(0, remainder);
    if (remainder < 0) {
      this._mana += remainder;
    }
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
    this._committedMana = this._committedManaPerTurn;
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  discardCardFromHand(card: Card) {
    this.hand.splice(this.hand.indexOf(card), 1);
    this.deck.discardPile.push(card);
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  shuffleDiscardsBack() {
    this.deck.shuffleDiscardsBack();
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }

  moveCardFromDeckToHand() {
    const card = this.deck.pile.pop();
    this.hand.push(card);
    this._events.emit(Constants.Events.PLAYER_STATE_CHANGED);
  }
}
