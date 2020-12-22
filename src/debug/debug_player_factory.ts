import { Card } from "../card/card";
import { Deck } from "../card/deck";
import { CardFactory } from "../card/card_factory";
import { Player } from "../player/player";

export namespace DebugPlayerFactory {
  export function buildPlayer(cardFactory: CardFactory): Player {
    const d = new Deck();

    d.addCard(cardFactory.GetTestCard(1));
    d.addCard(cardFactory.GetTestCard(2));
    d.addCard(cardFactory.GetTestCard(3));

    let p = new Player();
    p.deck = d;
    return p;
  }
}
