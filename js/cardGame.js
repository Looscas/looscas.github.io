let gameState = "play";
let deckId;
let cardsRemaining;
let discardPile = 0;
let cpuHealth = 100;

const infoDeck = document.querySelector("#infoDeck");
const infoCardsRemaining = document.querySelector("#infoCardsRemaining");
const infoDiscardPile = document.querySelector("#infoDiscardPile");

const cpuHealthBar = document.querySelector("#cpuHealth");

const newDeckBtn = document.getElementById("newDeck");
const drawCardBtn = document.getElementById("drawCard");
const playerHand = document.querySelector(".playerHand");
const cpuHand = document.querySelector(".cpuHand");

newDeckBtn.addEventListener("click", createNewDeck);
drawCardBtn.addEventListener("click", drawCard);

/* adding dragover event to the hp bars */
cpuHand.addEventListener("dragover", () => {
    cardBeingDragged = document.querySelector(".dragging");
    cardBeingDragged.target = "cpu";
});


class Card {
    constructor(code, image, value, suit, target = "cpu") {
        this.code = code;
        this.image = image;
        this.value = value;
        this.suit = suit;
        this.target = target;
    }

    createElement() {
        const newCard = document.createElement("li");
        newCard.dataset.code = this.code;
        newCard.dataset.value = this.value;
        newCard.dataset.suit = this.suit;
        newCard.draggable = true;

        const newCardImage = document.createElement("IMG");
        newCardImage.src = this.image;
        newCardImage.classList.add("card");
        newCard.appendChild(newCardImage);

        /* Add event listeners */
        newCard.addEventListener("dragstart", () => {
            newCardImage.classList.add("dragging");
        });
        newCard.addEventListener("dragend", () => {
            newCardImage.classList.remove("dragging");
            if(this.target === "cpu"){
                cpuHealth -= this.value;
                displayCpuHealth();
                console.log(cpuHealth);
            }
        });
  
        return newCard;
    }
}

async function createNewDeck() {
    const newDeck = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const response = await newDeck.json();
    deckId = response.deck_id;
    cardsRemaining = response.remaining;
    console.log("New Deck Created!");

    /* assign to info panel */
    infoDeck.textContent = "Deck: " + deckId;
    updateCardsRemaining();
    updateDiscardPile();
}

async function drawCard() {
    if(playerHand.children.length < 3 && cardsRemaining > 0){
        const deck = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const response = await deck.json();
        createCard(response.cards[0].code, response.cards[0].image, response.cards[0].value, response.cards[0].suit);
    
        cardsRemaining = response.remaining;
        console.log("Cards remaining: " + cardsRemaining);
        updateCardsRemaining();
    } else {
        console.log("Your hand is full!");
    }
}

function createCard(code, image, value, suit) {
    const newCard = new Card(code, image, value, suit).createElement();
    newCard.addEventListener("click", discardCard);

    playerHand.appendChild(newCard);
}

function updateCardsRemaining (){
    infoCardsRemaining.textContent = "Cards remaining: " + cardsRemaining;
}

function updateDiscardPile (){
    infoDiscardPile.textContent = "Discard pile: " + discardPile;
}

function discardCard() {
    discardPile += 1;
    updateDiscardPile();
    this.remove();
}

function displayCpuHealth() {
     cpuHealthBar.value = cpuHealth;
}

displayCpuHealth();