const soort = ["Harten", "Schoppen", "Ruiten", "Klaveren"];
const waarden = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "B", "V", "H", "A"];
let deck = [];
let handPlayer = [];
let handDealer = [];
const players = document.querySelectorAll('.player');
const btn1 = document.querySelector('#button1');
const btn2 = document.querySelector('#button2');
const handP = document.querySelector('#handPlayer');
const handD = document.querySelector('#handDealer');
const pScore = document.querySelector('#playerScore');

function startBlackJack() {
    document.getElementById('btnStart').value = 'Restart';
    createDeck();
    console.log(deck)
    shuffle();
    console.log(deck)
}

function dealHands() {
    for (let i = 0; i < 2; i++) {
        handPlayer.push(deck[0])
        deck.shift()
        handDealer.push(deck[0])
        deck.shift()
        renderCardDealer(handDealer[i]);
        renderCardPlayer(handPlayer[i]);

    }
    updateDeck();
    changeBtn();
    console.log(handPlayer, handDealer);
    countPlayerScore();
    pScore.innerHTML = countPlayerScore();
}

function hitMe() {
    if (countPlayerScore() <= 20) {
        console.log('moi');
        handPlayer.push(deck[0])
        deck.shift()
        renderCardPlayer(handPlayer[handPlayer.length-1]);
        updateDeck();
   
        console.log(handPlayer);
        pScore.innerHTML = countPlayerScore();
    }
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

function updateDeck() {
    document.getElementById('deckcount').innerHTML = deck.length;
}

function renderCardPlayer(card) {
    handP.appendChild(getCardUI(card));
}

function renderCardDealer(card) {
    handD.appendChild(getCardUI(card));
}


function getCardUI(card) {
    const el = document.createElement('div');
    let icon = '';
    if (card.Soort == 'Harten')
        icon = '&hearts;';
    else if (card.Soort == 'Schoppen')
        icon = '&spades;';
    else if (card.Soort == 'Ruiten')
        icon = '&diams;';
    else
        icon = '&clubs;';

    el.className = 'card';
    el.innerHTML = card.Waarde + '<br/>' + icon;
    return el;
}

function changeBtn() {
    btn1.classList.add('hidden')
    btn2.classList.remove('hidden');
}


function countPlayerScore() {
    aasManip();
    return handPlayer.reduce(function(accumulator, currentValue){
        return accumulator + currentValue.Value;
    }, 0);
}

function aasManip() {
    for (let i = 0; i < handPlayer.length; i++){
        if (countPlayerScore > 21 && handPlayer[i].Waarde === "A"){
            handPlayer[i].Value = 1;  
        }
    }
}