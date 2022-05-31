


async function loadPokemonUrls() {
    let urlPokemonList = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
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


async function PrepForRenderCard(responsePokemonAsJson) {
    let name = await responsePokemonAsJson['name'];
    let urlArtwork = await responsePokemonAsJson['sprites']['other']['official-artwork']['front_default'];
    let weight = await responsePokemonAsJson['weight'];
    let types = [];
    let stats = {
        'name': [],
        'baseStat': []
    };
    let abilityName = [];
    await fillVar(responsePokemonAsJson, types, abilityName, stats);
    renderCard(name, urlArtwork, weight, types, stats, abilityName);
}


async function fillVar(responsePokemonAsJson, types, abilityName, stats) {
    for (let i = 0; i < responsePokemonAsJson['types'].length; i++) {
        types.push(await responsePokemonAsJson['types'][i]['type']['name']);
    }
    for (let i = 0; i < responsePokemonAsJson['stats'].length; i++) {
        stats['name'].push(await responsePokemonAsJson['stats'][i]['name']);
        stats['baseStat'].push(await responsePokemonAsJson['stats'][i]['base_stat']);
    }
    for (let i = 0; i < responsePokemonAsJson['abilities'].length; i++) {
        abilityName.push(await responsePokemonAsJson['abilities'][i]['ability']['name']);

    }
}


function renderCard(name, urlArtwork, weight, types, stats, abilityName) {
    renderCardSmall(name, urlArtwork, types);
    renderCardBig(name, urlArtwork, weight, types, stats, abilityName);
}


function renderCardSmall(name, urlArtwork, types) {
    document.getElementById('cards').innerHTML += `
<div class="small-Card ${types[0]} ${types[1]}" onclick="modal(${name})">
<h2>${name}</h2>
<img class= "smallPic" src ="${urlArtwork}">
<span>${types[0]} ${types[1]}</span>
</div>
`;
}
function renderCardBig(name, urlArtwork, weight, types, stats, abilityName){}