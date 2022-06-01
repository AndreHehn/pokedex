let favorites = [];
let urlsForPokemon = [];
let pokemonData = [];
let weights = [];
let names = [];
let urlsArtwork = [];
let urlWeights = [];
let types = [];
let stats = [];
let abilityNames = [];


async function renderCardSmall() {
    await fillingArrays();
    for (let i = 0; i < pokemonData.length; i++) {
        let pokemonNumber = i + 1;
        htmlForRenderCardSmall(i, pokemonNumber);
        for (let j = 0; j < types[i].length; j++) {
            document.getElementById('type' + names[i]).innerHTML += `<div class= "type ${types[i][j]}">${types[i][j]}</div>`;
        }
        if (favorites.indexOf[i]) {
            document.getElementById('like' + i).innerHTML = `<img class="like" src="./img/pokeball.png" onclick="removeFromFavorites(${i})"></img>`;
        }
        else {
            document.getElementById('like' + i).innerHTML = ` <img class="like" src="./img/pokeball_open.png" onclick="addToFavorites(${i})"></img>`;
        } 
    }  
}


async function fillingArrays() {
    await getPokemonURL();
    for (i = 0; i < pokemonData.length; i++) {
        let singlePokemonData = pokemonData[i];
        let singleTypes = [];
        let singleStats = {
            'name': [],
            'baseStat': []
        };
        let abilityName = [];
        fillVar(singlePokemonData, singleTypes, abilityName, singleStats);
        pushingDataForRender(singlePokemonData, abilityName, singleTypes, singleStats);
    }
}


async function getPokemonURL() {
    await loadPokemonUrls();
    for (let i = 0; i < urlsForPokemon['results'].length; i++) {
        let urlPokemon = await urlsForPokemon['results'][i]['url'];
        let responsePokemon = await fetch(urlPokemon);
        let responsePokemonAsJson = await responsePokemon.json();
        pokemonData.push(responsePokemonAsJson);
    }
}

async function loadPokemonUrls() {
    let urlPokemonList = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let response = await fetch(urlPokemonList);
    let responseAsJson = await response.json();
    urlsForPokemon = responseAsJson;
}


function pushingDataForRender(singlePokemonData, abilityName, singleTypes, singleStats) {
    names.push(singlePokemonData['name']);
    urlsArtwork.push(singlePokemonData['sprites']['other']['official-artwork']['front_default']);
    weights.push(singlePokemonData['weight']);
    types.push(singleTypes);
    stats.push(singleStats);
    abilityNames.push(abilityName);
}


function fillVar(singlePokemonData, singleTypes, abilityName, singleStats) {
    for (let i = 0; i < singlePokemonData['types'].length; i++) {
        singleTypes.push(singlePokemonData['types'][i]['type']['name']);
    }
    for (let i = 0; i < singlePokemonData['stats'].length; i++) {
        singleStats['name'].push(singlePokemonData['stats'][i]['name']);
        singleStats['baseStat'].push(singlePokemonData['stats'][i]['base_stat']);
    }
    for (let i = 0; i < singlePokemonData['abilities'].length; i++) {
        abilityName.push(singlePokemonData['abilities'][i]['ability']['name']);

    }
}


function htmlForRenderCardSmall(i, pokemonNumber) {
    document.getElementById('cards').innerHTML += `
    <div class="small-card card${types[i][0]}">
    <div class="headline"><div class="pokemon-number" onclick="modal(${i})">#${pokemonNumber}</div><div id="like${i}"></div></div>
    <h2  onclick="modal(${i})" >${names[i]}</h2>
    <img  onclick="modal(${i})" class= "small-pic" src ="${urlsArtwork[i]}">
    <div  onclick="modal(${i})" id ="type${names[i]}" class="types"></div></div>`;

}


function addToFavorites(i) {
    favorites.push(i);
    document.getElementById('like' + i).innerHTML = `<img class="like"  src="./img/pokeball.png" onclick="removeFromFavorites(${i})"></img>`;
}


function removeFromFavorites(i) {
    let position = favorites.indexOf(i);
    favorites.splice(position, 1);
    document.getElementById('like' + i).innerHTML = `<img class="like"  src="./img/pokeball_open.png" onclick="addToFavorites(${i})"></img>`;
}

function modal(i) { }


function showList() { }

function showFavorites() { }



function renderCardBig() {

}