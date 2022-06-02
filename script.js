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
    // Open Explanation Modal
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
        singleStats['name'].push(singlePokemonData['stats'][i]['name']);
        singleStats['baseStat'].push(singlePokemonData['stats'][i]['base_stat']);
    }
    for (let i = 0; i < singlePokemonData['abilities'].length; i++) {
        abilityName.push(singlePokemonData['abilities'][i]['ability']['name']);

    }
}


function renderCardSmall() {
    if (max > pokemonData.length) { max = pokemonData.length; };
    forLoopForRenderCardSmall();
    min += 25;
    max += 25;
    document.getElementById('loading').classList.add('d-none');
}


function renderList() {
    document.getElementById("listPokemon").innerHTML = '';
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        document.getElementById("listPokemon").innerHTML += `<tr class="list-item" id="listItem${i}" onclick="modal(${i})"><td>#${i + 1}&nbsp;</td><td>${name}&nbsp; </td><td class="td3"></td></tr>`;
        for (let j = 0; j < favorites.length; j++) {
            const favorite = favorites[j];
            if (favorite == i) {
                document.getElementById("listItem" + i).innerHTML = `<td>#${i + 1}&nbsp;</td><td>${name}&nbsp;</td><td class="td3"><img class="list-pic" src="./img/pokeball.png"></td>`;
            }
        }
    }
}


function loadNext() {
    document.getElementById('next20div').innerHTML = '';
    renderCardSmall();
}


function forLoopForRenderCardSmall() {
    for (let i = min; i < max; i++) {
        let pokemonNumber = i + 1;
        htmlForRenderCardSmall(i, pokemonNumber);
        document.getElementById('like' + i).innerHTML = ` <img class="like" title="catch the pokemon" src="./img/pokeball_open.png" onclick="addToFavorites(${i})"></img>`;
        for (let j = 0; j < favorites.length; j++) {
            if (favorites[j] == i) { document.getElementById('like' + favorites[j]).innerHTML = `<img class="like" title="release the pokemon" src="./img/pokeball.png" onclick="removeFromFavorites(${i})"></img>`; }
        }
        if (i == max - 1 && max !== pokemonData.length) { document.getElementById('next20div').innerHTML += `<div class="next20" id ="loadnext${max}" onclick="loadNext()"> load more</div>`; }
    }
}


function htmlForRenderCardSmall(i, pokemonNumber) {
    document.getElementById('cards').innerHTML += `
    <div class="small-card card${types[i][0]}">
    <div class="headline"><div class="pokemon-number" onclick="modal(${i})">#${pokemonNumber}</div><div id="like${i}"></div></div>
    <div class="small-card-wrapper" onclick="modal(${i})">
    <h2>${names[i]}</h2>
    <img class= "small-pic" src ="${urlsArtwork[i]}">
    <div id ="type${names[i]}" class="types"></div></div></div>`;
    for (let j = 0; j < types[i].length; j++) {
        document.getElementById('type' + names[i]).innerHTML += `<div class= "type ${types[i][j]}">${types[i][j]}</div>`;
    }
}


function addToFavorites(i) {
    favorites.push(i);
    document.getElementById('like' + i).innerHTML = `<img class="like" title="release the pokemon" src="./img/pokeball.png" onclick="removeFromFavorites(${i})"></img>`;
    renderList();
}


function removeFromFavorites(i) {
    let position = favorites.indexOf(i);
    favorites.splice(position, 1);
    document.getElementById('like' + i).innerHTML = `<img class="like"  title="catch the pokemon" src="./img/pokeball_open.png" onclick="addToFavorites(${i})"></img>`;
    renderList();
}


function showList() {
    document.getElementById("mySidenav").style.width = "270px";
    document.getElementById('listpic').setAttribute('onclick', 'closeList()');
}

function closeList() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById('listpic').setAttribute('onclick', 'showList()');
}


function modal(n) {
    document.getElementById("modal").style.display = "flex";
    renderCardBig(n);
}

function closeModal() { document.getElementById("modal").style.display = "none"; }




function renderCardBig() {
    //erstellt große Karte Mit Infos wie Gewicht etc. evtl sogar bildlich dargestellt
}


function showFavorites() {
    document.getElementById('cards').innerHTML = '';
    document.getElementById('next20div').innerHTML = '';
    document.getElementById('pokemonFavorite').setAttribute('onclick', 'closeFavorites()');
    document.getElementById('pokemonFavorite').src = "./img/pokeball_open.png";
    min = 0;
    max = 20;
    for (let i = 0; i < favorites.length; i++) {
        let element = favorites[i];
        let pokemonNumber = element + 1;
        htmlForRenderCardSmall(element, pokemonNumber);
        document.getElementById('like' + element).innerHTML = `<img class="like" src="./img/pokeball.png" onclick="removeFromFavoritesWhileShown(${element})"></img>`;
    }
}


function removeFromFavoritesWhileShown(element) {
    removeFromFavorites(element);
    showFavorites();
}
function closeFavorites() {
    document.getElementById('cards').innerHTML = '';
    document.getElementById('pokemonFavorite').setAttribute('onclick', 'showFavorites()');
    document.getElementById('pokemonFavorite').src = "./img/pokeball.png";
    document.getElementById('loading').classList.remove('d-none');
    renderCardSmall();
}


window.onclick = function (event) {
    if (event.target == document.getElementById("modal")) {
        closeModal();
    }
}


function search() {
    let searchValue = document.getElementById('input').value;
    searchValue = searchValue.toLowerCase();
    document.getElementById("listPokemon").innerHTML = '';
    forLoopForSearch(searchValue);
}


function forLoopForSearch(searchValue) {
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        if (name.toLowerCase().includes(searchValue)) {
            document.getElementById("listPokemon").innerHTML += `<tr class="list-item" id="listItem${i}" onclick="modal(${i})"><td>#${i + 1}&nbsp;</td><td>${name}&nbsp; </td><tdclass="td3"></td></tr>`;
            for (let j = 0; j < favorites.length; j++) {
                const favorite = favorites[j];
                if (favorite == i) {
                    document.getElementById("listItem" + i).innerHTML = `<td>#${i + 1}&nbsp;</td><td>${name}&nbsp;</td><td class="td3"><img class="list-pic" src="./img/pokeball.png"></td>`;
                }
            }
        }
    }
}