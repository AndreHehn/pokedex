let favorites = [];

//has to be refactored 
async function loadPokemonUrls() {
    let urlPokemonList = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let response = await fetch(urlPokemonList);
    let responseAsJson = await response.json();
    await getPokemonURL(responseAsJson);
}


async function getPokemonURL(responseAsJson) {
    for (let i = 0; i < responseAsJson['results'].length; i++) {
        let urlPokemon = await responseAsJson['results'][i]['url'];
        let responsePokemon = await fetch(urlPokemon);
        let responsePokemonAsJson = await responsePokemon.json();
        PrepForRenderCard(responsePokemonAsJson, i);
    }
}


function PrepForRenderCard(responsePokemonAsJson, i) {
    let name = responsePokemonAsJson['name'];
    let urlArtwork = responsePokemonAsJson['sprites']['other']['official-artwork']['front_default'];
    let weight = responsePokemonAsJson['weight'];
    let types = [];
    let stats = {
        'name': [],
        'baseStat': []
    };
    let abilityName = [];
    fillVar(responsePokemonAsJson, types, abilityName, stats);
    renderCard(name, urlArtwork, weight, types, stats, abilityName, i);
}


function fillVar(responsePokemonAsJson, types, abilityName, stats) {
    for (let i = 0; i < responsePokemonAsJson['types'].length; i++) {
        types.push(responsePokemonAsJson['types'][i]['type']['name']);
    }
    for (let i = 0; i < responsePokemonAsJson['stats'].length; i++) {
        stats['name'].push(responsePokemonAsJson['stats'][i]['name']);
        stats['baseStat'].push(responsePokemonAsJson['stats'][i]['base_stat']);
    }
    for (let i = 0; i < responsePokemonAsJson['abilities'].length; i++) {
        abilityName.push(responsePokemonAsJson['abilities'][i]['ability']['name']);

    }
}


function renderCard(name, urlArtwork, weight, types, stats, abilityName, i) {
    renderCardSmall(name, urlArtwork, types, i);
    renderCardBig(name, urlArtwork, weight, types, stats, abilityName);
}


function renderCardBig(name, urlArtwork, weight, types, stats, abilityName) {

}


function renderCardSmall(name, urlArtwork, types, i) {
    let pokemonNumber = i + 1;

    htmlForRenderCardSmall(i, name, urlArtwork, types, pokemonNumber);
    for (let i = 0; i < types.length; i++) {
        document.getElementById('type' + name).innerHTML += `<div class= "type ${types[i]}">${types[i]}</div>`;
    }
    if (favorites.indexOf[i]) {
        document.getElementById('likestar' + i).innerHTML = `<img class="like" src="./img/pokeball.png" onclick="removeFromFavorites(${i})"></img>`;
    }
    else {
        document.getElementById('likestar' + i).innerHTML = ` <img class="like" src="./img/pokeball_open.png" onclick="addToFavorites(${i})"></img>`;
    }
}


function htmlForRenderCardSmall(i, name, urlArtwork, types, pokemonNumber) {
    document.getElementById('cards').innerHTML += `
    <div class="small-card card${types[0]}">
    <div class="headline"><div class="pokemon-number" onclick="modal(${i})">#${pokemonNumber}</div><div id="likestar${i}"></div></div>
    <h2  onclick="modal(${i})" >${name}</h2>
    <img  onclick="modal(${i})" class= "small-pic" src ="${urlArtwork}">
    <div  onclick="modal(${i})" id ="type${name}" class="types"></div></div>`;

}


function addToFavorites(i) {
    favorites.push(i);
    document.getElementById('likestar' + i).innerHTML = `<img class="like"  src="./img/pokeball.png" onclick="removeFromFavorites(${i})"></img>`;
}


function removeFromFavorites(i) {
    let position = favorites.indexOf(i);
    favorites.splice(position, 1);
    document.getElementById('likestar' + i).innerHTML = `<img class="like"  src="./img/pokeball_open.png" onclick="addToFavorites(${i})"></img>`;
}

function modal(i) { }


function showList() { }

function showFavorites() { }


