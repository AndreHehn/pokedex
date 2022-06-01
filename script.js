


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
        PrepForRenderCard(responsePokemonAsJson);
    }
}


function PrepForRenderCard(responsePokemonAsJson) {
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
    renderCard(name, urlArtwork, weight, types, stats, abilityName);
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


function renderCard(name, urlArtwork, weight, types, stats, abilityName) {
    renderCardSmall(name, urlArtwork, types);
    renderCardBig(name, urlArtwork, weight, types, stats, abilityName);
}


function renderCardSmall(name, urlArtwork, types) {
    document.getElementById('cards').innerHTML += `
    <div class="small-card card${types[0]}" onclick="modal(${name})">
    <h2>${name}</h2>
    <img class= "small-pic" src ="${urlArtwork}">
    <div id ="type${name}" class="types"></div>
    </div>
    `;
    for (let i = 0; i < types.length; i++) {
        document.getElementById('type' + name).innerHTML += `<div class= "type ${types[i]}">${types[i]}</div>`;
    }
}


function renderCardBig(name, urlArtwork, weight, types, stats, abilityName) { }