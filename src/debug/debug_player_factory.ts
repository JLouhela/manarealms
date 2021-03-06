import { Card } from "../game/card/card";
import { Deck } from "../game/card/deck";
import { CardFactory } from "../game/card/card_factory";
import { Player } from "../game/player/player";

export namespace DebugPlayerFactory {
  export function buildPlayer(): Player {
    const d = new Deck();
    let cardFactory = new CardFactory();
    d.addCard(cardFactory.GetTestCard(1));
    d.addCard(cardFactory.GetTestCard(2));
    d.addCard(cardFactory.GetTestCard(3));
    d.addCard(cardFactory.GetTestCard(1));
    d.addCard(cardFactory.GetTestCard(2));
    d.addCard(cardFactory.GetTestManaCard(1));
    d.addCard(cardFactory.GetTestManaCard(1));
    d.addCard(cardFactory.GetTestManaCard(1));
    d.addCard(cardFactory.GetTestManaCard(1));
    d.addCard(cardFactory.GetTestManaCard(2));

    d.shuffleDeck();

    let p = new Player();
    p.deck = d;
    return p;
  }
}
