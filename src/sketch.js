/**
 * Each of the editable slots
 */
const SLOTS = {
    FLOP_1: new CardSlot('FLOP_1'),
    FLOP_2: new CardSlot('FLOP_2'),
    FLOP_3: new CardSlot('FLOP_3'),
    TURN: new CardSlot('TURN'),
    RIVER: new CardSlot('RIVER'),
    HOLE_1: new CardSlot('HOLE_1'),
    HOLE_2: new CardSlot('HOLE_2'),
}

const PADDING = 10
const MIN_CARD_WIDTH = 110
const MENU_WIDTH = 400

let cardWidth = 0
let cardHeight = 0
let communityX = 0
let communityY = 0
let holeX = 0
let holeY = 0

let menu = null
let selectedCard = null

//////////////////
// P5 FUNCTIONS //
//////////////////

function setup() {
    createCanvas(windowWidth, windowHeight)
    computeCardDisplay(windowWidth, windowHeight)
    initData()
    menu = new SelectPanel(windowWidth - MENU_WIDTH, 0, MENU_WIDTH, windowHeight)
}

function draw() {
    background(255)

    SLOTS.FLOP_1.display(communityX, communityY, cardWidth, cardHeight)
    SLOTS.FLOP_2.display(communityX + cardWidth + PADDING, communityY, cardWidth, cardHeight)
    SLOTS.FLOP_3.display(communityX + 2*cardWidth + 2*PADDING, communityY, cardWidth, cardHeight)
    SLOTS.TURN.display(communityX + 3*cardWidth + 3*PADDING, communityY, cardWidth, cardHeight)
    SLOTS.RIVER.display(communityX + 4*cardWidth + 4*PADDING, communityY, cardWidth, cardHeight)
    SLOTS.HOLE_1.display(holeX, holeY, cardWidth, cardHeight)
    SLOTS.HOLE_2.display(holeX + cardWidth + PADDING, holeY, cardWidth, cardHeight)

    if (showMenu) menu.display()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  computeCardDisplay(windowWidth, windowHeight)
}

function mousePressed() {
    for (id in SLOTS) {
        let slot = SLOTS[id]
        if (dist(mouseX, mouseY, slot.getCenterX(), slot.getCenterY()) < slot.getW()/2) {
            if (!slot.isChoosing()) {
                selectedCard = slot
                showMenu = true
            }
        }
    }

    if (showMenu) menu.handlePress()

    return false
}

/////////////
// HELPERS //
/////////////

function computeCardDisplay(width, height) {
    cardWidth = Math.max(width/15, MIN_CARD_WIDTH)
    cardHeight = cardWidth*(3/2)
    communityX = width/2 - (5/2)*cardWidth - (5/2)*PADDING
    communityY = height/2 - cardHeight
    holeX = width/2 - cardWidth - PADDING
    holeY = height - (3/2)*cardHeight
    if (menu != null) menu.changeDimensions(windowWidth - MENU_WIDTH, 0, MENU_WIDTH, windowHeight)
}