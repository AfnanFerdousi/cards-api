
const main = document.getElementById('main')
const searchButton = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error');

    const inputValue = parseInt(input.value);
    if (isNaN(inputValue) || inputValue == "") {
        // alert('please enter a number')
        error.innerText = "!! please enter a number !!";
        input.value = "";
        main.innerHTML = "";
    }
    else if (inputValue <= 0) {
        error.innerText = "!! Please give a positive number !!";
        input.value = "";
        main.innerHTML = "";
    }
    else {
        main.innerHTML = "";

        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => cardsDisplay(data.cards))
        input.value = "";
        error.innerHTML = "";
    }
}

const cardsDisplay = (cards) => {
    for (const card of cards) {
        const div = document.createElement('div');
        div.classList.add('col-lg-4')
        div.classList.add('my-5')
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${card.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${card.suit}</h5>
                    <p class="card-text">${card.code}</p>
                    <button onclick="cardDetails('${card.code}')" href="#" class="btn btn-primary">Details</button>
                </div>
            </div>                    
        `
        main.appendChild(div);
    }    
}

const cardDetails = (code) => {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
            .then(res => res.json())
        .then(data => {
            const allCards = data.cards;
            const singleCard = allCards.find(card => card.code === code)
            const div = document.createElement('div');
            main.innerHTML ="";
             div.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${singleCard.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${singleCard.suit}</h5>
                        <p class="card-text">${singleCard.code}</p>
                        <p class="card-text">${singleCard.value}</p>                      
                    </div>
                </div>                    
        `
            main.appendChild(div);
        })
}