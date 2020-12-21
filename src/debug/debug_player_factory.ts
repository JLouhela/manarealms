import { Card } from "../card/card";
import { Deck } from "../card/deck";
import { Player } from "../player/player";

export namespace DebugPlayerFactory {
  export function buildPlayer(): Player {
    const d = new Deck();

    const card1 = new Card();
    card1.manacost = 5;
    const card2 = new Card();
    card2.manacost = 4;
    const card3 = new Card();
    card3.manacost = 3;

    d.addCard(card1);
    d.addCard(card2);
    d.addCard(card3);

    card2.manacost = 3;
    let p = new Player();
    p.deck = d;
    return p;
  }
}
