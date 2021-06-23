const soort = ["Harten", "Schoppen", "Ruiten", "Klaveren"];
const waarden = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "B", "V", "H", "A"];
let deck = new Array();

function startBlackJack() {
    createDeck();
    console.log(deck)
    shuffle();
    console.log(deck)
}

function createDeck() {
    deck = new Array();
    for (let i = 0; i < waarden.length; i++) {
        for (let x = 0; x < soort.length; x++) {
            let value = parseInt(waarden[i]);
            if (waarden[i] == "B" || waarden[i] == "V" || waarden[i] == "H") {
                value = 10;
            }
            if (waarden[i] == "A") {
                value = 11;
            }
            const card = {
                Waarde: waarden[i],
                Soort: soort[x],
                Value: value
            }
            deck.push(card);
        }
    }
}

function shuffle() {
    for (let i = 0; i < deck.length; i++) {
        let locatie1 = Math.floor((Math.random() * deck.length));
        let locatie2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[locatie1];

        deck[locatie1] = deck[locatie2];
        deck[locatie2] = tmp;
    }
}