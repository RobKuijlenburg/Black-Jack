"use strict";

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
const cardSelect = document.getElementsByClassName('card');
let winpcount = 0;
let windcount = 0;
const winpSelect = document.getElementById('playerwins');
const windSelect = document.getElementById('dealerwins');

function startBlackJack() {
    createDeck();
    shuffle();
    printScore();
}

function restart() {
    deck = [];
    handPlayer = [];
    handDealer = [];
    btn2.classList.add('hidden')
    btn1.classList.remove('hidden');
    createDeck();
    shuffle();
    printScore();
    document.querySelectorAll('.card').forEach(e => e.remove());
}

function dealHands() {
    for (let i = 0; i < 2; i++) {
        handPlayer.push(deck[0])
        deck.shift()
        handDealer.push(deck[0])
        deck.shift()
        renderCard(handDealer[i], handD);
        renderCard(handPlayer[i], handP);    
    }
    updateDeck();
    changeBtn();
    aasManip(handPlayer);
    aasManip(handDealer);
    countScore(handPlayer);
    pScore.innerHTML = countScore(handPlayer);
    setTimeout(function(){checkPlayerCondition()},200);
    cardSelect[3].classList.add('hide-text')
}

function hitMe() {
    // TODO :: turn around to reduce indents and increase readability
    // if (countScore(handPlayer) > 20) return
    if (countScore(handPlayer) <= 20) {
        handPlayer.push(deck[0])
        deck.shift()
        renderCard(handPlayer[handPlayer.length - 1], handP);
        updateDeck();
        aasManip(handPlayer);
        pScore.innerHTML = countScore(handPlayer);    
        setTimeout(function(){checkPlayerCondition()},200);
    }  
}

function stay() {
    cardSelect[cardSelect.length-1].classList.remove('hide-text')
    while (countScore(handDealer) < 16) {
        if (countScore(handDealer) < 16) {
            handDealer.push(deck[0])
            deck.shift()
            renderCard(handDealer[handDealer.length - 1], handD);
            updateDeck();
            dScore.innerHTML = countScore(handDealer);
            aasManip(handDealer);
        } else if (countScore(handDealer) === 16 && countScore(handPlayer) === 16) {
            break;
        } else if (countScore(handDealer) > 16) {
            break;
        }
    }
    dScore.innerHTML = countScore(handDealer);
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
        // TODO :: can use const here
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

function renderCard(card, hand) {
    hand.appendChild(getCardUI(card));
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

function countScore(player) {
    return player.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.Value;
    }, 0);
}

function checkPlayerCondition() {
        if (countScore(handPlayer) === 21){
            cardSelect[cardSelect.length-1].classList.remove('hide-text')
            alert('Black Jack. Player 1 wins!!')
            dScore.innerHTML = countScore(handDealer);
            winpcount += 1;
            winpSelect.innerHTML = winpcount;
        } else if(countScore(handPlayer) > 21 || handPlayer.length > 5) {
            cardSelect[cardSelect.length-1].classList.remove('hide-text')
            alert('Player 1 busts');
            dScore.innerHTML = countScore(handDealer);
            windcount += 1;
            windSelect.innerHTML = windcount;
        }
}

function checkWin() {
    if (countScore(handPlayer) > countScore(handDealer) || countScore(handDealer) > 21){
        alert('Player 1 Wins');
        winpcount += 1;
        winpSelect.innerHTML = winpcount;
    } else if (countScore(handPlayer) < countScore(handDealer)){
        alert('Dealer Wins');
        windcount += 1;
        windSelect.innerHTML = windcount;
    } else if (countScore(handPlayer) === countScore(handDealer)) {
        alert('Draw');
    }
}

function printScore() {
    pScore.innerHTML = countScore(handPlayer);
    dScore.innerHTML = countScore(handDealer);
}

function aasManip(player) {
    for (let i = 0; i < player.length; i++) {
        if (countScore(player) > 21 && player[i].Waarde === "A") {
            player[i].Value = 1;
        }
    }
}