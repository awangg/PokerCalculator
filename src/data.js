/**
 * Cards remaining in the simulated deck.
 */
let DECK = []

/**
 * Cards dealt from the simulated deck.
 */
let SELECTED = []

/**
 * Mapping of card id to p5.js image object. Lazy load images as requested. 
 */
let ID_TO_IMG = {}

/**
 * Initialize all of the mappings
 */
function initData() {
    // Add all cards to the simulated deck
    for (id in CARDS) {
        if (id != CARDS.UNKNOWN) DECK.push(new Card(id))
    }
    
    // Initialize unloaded paths
    for (id in CARDS) {
        if (id != CARDS.UNKNOWN) ID_TO_IMG[id] = ""
    }
}