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
let min = 0;
let max = 25;

async function init() {
    await fillingArrays();
    renderCardSmall();
    renderList();
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
        singleStats['name'].push(singlePokemonData['stats'][i]['stat']['name']);
        singleStats['baseStat'].push(singlePokemonData['stats'][i]['base_stat']);
    }
    for (let i = 0; i < singlePokemonData['abilities'].length; i++) {
        abilityName.push(singlePokemonData['abilities'][i]['ability']['name']);

    }
}
