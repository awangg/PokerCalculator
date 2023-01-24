/**
 * Enum mapping memorable ids to integers.
 */
const CARDS = {
    TWO_S: 1,
    TWO_D: 2,
    TWO_H: 3,
    TWO_C: 4,
    THREE_S: 5,
    THREE_D: 6,
    THREE_H: 7,
    THREE_C: 8,
    FOUR_S: 9,
    FOUR_D: 10,
    FOUR_H: 11,
    FOUR_C: 12,
    FIVE_S: 13,
    FIVE_D: 14,
    FIVE_H: 15,
    FIVE_C: 16,
    SIX_S: 17,
    SIX_D: 18,
    SIX_H: 19,
    SIX_C: 20,
    SEVEN_S: 21,
    SEVEN_D: 22,
    SEVEN_H: 23,
    SEVEN_C: 24,
    EIGHT_S: 25,
    EIGHT_D: 26,
    EIGHT_H: 27,
    EIGHT_C: 28,
    NINE_S: 29,
    NINE_D: 30,
    NINE_H: 31,
    NINE_C: 32,
    TEN_S: 33,
    TEN_D: 34,
    TEN_H: 35,
    TEN_C: 36,
    JACK_S: 37,
    JACK_D: 38,
    JACK_H: 39,
    JACK_C: 40,
    QUEEN_S: 41,
    QUEEN_D: 42,
    QUEEN_H: 43,
    QUEEN_C: 44,
    KING_S: 45,
    KING_D: 46,
    KING_H: 47,
    KING_C: 48,
    ACE_S: 49,
    ACE_D: 50,
    ACE_H: 51,
    ACE_C: 52,
}

class Card {
    constructor(id) {
        this.id = id
    }

    display(x, y, w, h) {
        if (!ID_TO_IMG[this.id]) ID_TO_IMG[this.id] = loadImage(`/assets/cards/${this.id}.png`)
        image(ID_TO_IMG[this.id], x, y, w, h)
    }
}

class CardSlot {
    constructor(id) {
        this.id = id
        this.card = null
        this.choosing = false
    }

    display(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        if (this.card == null) {
            fill(215)
            rect(x, y, w, h, 4)
            fill(0)
            rect(x + w/2 - 2, y+ h/2 - 10, 4, 20)
            rect(x + w/2- 10, y+ h/2 - 2, 20, 4)
        } else this.card.display(x, y, w, h)
    }

    setCard(id) {
        if (this.card != null) {
            DECK.push(this.card)
            SELECTED.splice(SELECTED.indexOf(this.card), 1)
        }
        this.card = id
    }

    getId() {
        return this.id
    }

    getCenterX() {
        return this.x + this.w/2
    }

    getCenterY() {
        return this.y + this.h/2
    }

    getW() {
        return this.w
    }

    getH() {
        return this.h
    }
    
    isChoosing() {
        return this.choosing
    }
}

var showMenu = false
let CARD_DIM = 60
let CARD_PADDING = 10

class SelectPanel {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.buttons = []

        let buttonX = this.x + this.w/2 - 2*CARD_DIM - 2*CARD_PADDING
        let buttonY = this.y + this.h/2 - 6*CARD_DIM - 8*CARD_PADDING

        DECK.forEach((value, index) => {
            let offset = Math.floor(index/4)
            this.buttons.push(new CardButton(value,
                buttonX + (index%4*CARD_DIM) + (index%4 + 1)*CARD_PADDING, buttonY + (offset*CARD_DIM) + offset*CARD_PADDING))
        })
    }

    display() {
        fill(215)
        rect(this.x, this.y, this.w, this.h)

        this.buttons.forEach((button) => {
            if (!SELECTED.includes(button.card)) button.display()
        })
    }

    changeDimensions(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        let buttonX = this.x + this.w/2 - 2*CARD_DIM - 2*CARD_PADDING
        let buttonY = this.y + this.h/2 - 6*CARD_DIM - 8*CARD_PADDING

        this.buttons.forEach((button, index) => {
            let offset = Math.floor(index/4)
            button.changeDimensions(buttonX + (index%4*CARD_DIM) + (index%4 + 1)*CARD_PADDING, buttonY + (offset*CARD_DIM) + offset*CARD_PADDING)
        })
    }

    handlePress() {
        this.buttons.forEach((button) => {
            button.handlePress()
        })
    }

}

class CardButton {

    constructor(card, x, y) {
        this.x = x;
        this.y = y;
        this.card = card
    }

    display() {
        fill(255)
        rect(this.x, this.y, CARD_DIM, CARD_DIM)
        fill(0)
        textAlign(CENTER)
        text(this.card.id, this.x + CARD_DIM/2, this.y + CARD_DIM/2 + 5)
    }

    changeDimensions(x, y) {
        this.x = x
        this.y = y
    }

    handlePress() {
        if (dist(this.x+CARD_DIM/2, this.y+CARD_DIM/2, mouseX, mouseY) < CARD_DIM/2) {
            selectedCard.setCard(this.card)
            selectedCard = null
            showMenu = false

            SELECTED.push(this.card)
            DECK.splice(DECK.indexOf(this.card), 1)
        }
    }
}