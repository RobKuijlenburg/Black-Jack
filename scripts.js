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
const btnS = document.querySelector('#btnStart');
const btnR = document.querySelector('#btnRestart');

function startBlackJack() {
    createDeck();
    shuffle();
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
    countPlayerScore();
    pScore.innerHTML = countPlayerScore();
    setTimeout(function(){checkPlayerCondition()},200);
}

function hitMe() {
    if (countPlayerScore() <= 20) {
        handPlayer.push(deck[0])
        deck.shift()
        renderCardPlayer(handPlayer[handPlayer.length - 1]);
        updateDeck();
        pScore.innerHTML = countPlayerScore();    
        setTimeout(function(){checkPlayerCondition()},200);
    }  
}

function stay() {
    while (countDealerScore() < 30) {
        if (countDealerScore() < 16) {
            handDealer.push(deck[0])
            deck.shift()
            renderCardDealer(handDealer[handDealer.length - 1]);
            updateDeck();
            dScore.innerHTML = countDealerScore();
        } else if (countDealerScore() === 16 && countPlayerScore() === 16) {
            break;
        } else if (countDealerScore() >= 17) {
            break;
        }
    }
    setTimeout(function(){checkWin()}, 300);
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
    return handPlayer.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.Value;
    }, 0);
}

function countDealerScore() {
    return handDealer.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.Value;
    }, 0);
}

function checkPlayerCondition() {
    for (i = 0 ; i < 1; i ++) {
        if (countPlayerScore() === 21){
            alert('Black Jack. Player 1 wins!!')
        } else if(countPlayerScore() > 21) {
            alert('Player 1 busts');
        }
    }
}

function checkWin() {
    for (i = 0; i < 1; i++){
        if (countPlayerScore() > countDealerScore() || countDealerScore() > 21){
            alert('Player 1 Wins');
        } else if (countPlayerScore() < countDealerScore()){
            alert('Dealer Wins');
        } else if (countPlayerScore() === countDealerScore()) {
            alert('Draw');
        }
    }
}

function aasManip() {
    for (let i = 0; i < handPlayer.length; i++) {
        if (countPlayerScore > 21 && handPlayer[i].Waarde === "A") {
            handPlayer[i].Value = 1;
        }
    }
}