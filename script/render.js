/*those functions mainly render the content for the page. */

/*renders small card */
function renderCardSmall() {
    if (max > pokemonData.length) { max = pokemonData.length; };
    forLoopForRenderCardSmall();
    min += 25;
    max += 25;
    document.getElementById('loading').classList.add('d-none');
}


function forLoopForRenderCardSmall() {
    for (let i = min; i < max; i++) {
        let pokemonNumber = i + 1;
        htmlForRenderCardSmall(i, pokemonNumber);
        document.getElementById('like' + i).innerHTML = ` <img class="like" title="catch the pokemon" src="./img/pokeball_open.png" onclick="addToFavorites(${i}, event)">`;
        for (let j = 0; j < favorites.length; j++) {
            if (favorites[j] == i) { document.getElementById('like' + favorites[j]).innerHTML = `<img class="like" title="release the pokemon" src="./img/pokeball.png" onclick="removeFromFavorites(${i}, event)">`; }
        }
        if (i == max - 1 && max !== pokemonData.length) { document.getElementById('next20div').innerHTML += `<div class="next20" id ="loadnext${max}" onclick="loadNext()"> load more</div>`; }
    }
}


function htmlForRenderCardSmall(i, pokemonNumber) {
    document.getElementById('cards').innerHTML += `
    <div class="small-card card${types[i][0]}" onclick="modal(${i})">
    <div class="headline"><div class="pokemon-number">#${pokemonNumber}</div><div id="like${i}"></div></div>
    <div class="small-card-wrapper" >
    <h2>${names[i]}</h2>
    <img class= "small-pic" src ="${urlsArtwork[i]}">
    <div id ="type${names[i]}" class="types"></div></div></div>`;
    for (let j = 0; j < types[i].length; j++) {
        document.getElementById('type' + names[i]).innerHTML += `<div class= "type ${types[i][j]}">${types[i][j]}</div>`;
    }
}

/*renders list */
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

/*renders big Cards */
function renderCardBig(id) {
    document.getElementById('modalContent').innerHTML = '';
    htmlForRenderCardBig(id)
    document.getElementById('likebig' + id).innerHTML = ` <img class="like-big" title="catch the pokemon" src="./img/pokeball_open.png" onclick="addToFavoritesBig(${id})">`;
    document.getElementById('tableBig').innerHTML += `<tr class ="tr-big"><td class="td-left">weight:</td><td class="td-right">${weights[id]}</td></tr>`;
    forLoopsForRenderCardBig1(id);
    forLoopsForRenderCardBig2(id);
}


function htmlForRenderCardBig(id){
    document.getElementById('modalContent').innerHTML = `
    <div class ="big-card card${types[id][0]}" id="bigcard">
        <div class="headline-big">
            <div class="pokemon-number-big">#${id + 1}</div>
            <div id="likebig${id}"></div>
        </div>
        <h2>${names[id]}</h2>
        <img class= "big-pic" src ="${urlsArtwork[id]}">
        <div id ="type-big${names[id]}" class="types-big"></div>
        <table id ="tableBig"></table>
        <span onclick="closeModal()" class="close">close</span>
    </div>
    `;
}


function forLoopsForRenderCardBig1(id) {
    for (let j = 0; j < types[id].length; j++) {
        document.getElementById('type-big' + names[id]).innerHTML += `<div class= "type-big ${types[id][j]}">${types[id][j]}</div>`;
    }
    for (let j = 0; j < favorites.length; j++) {
        if (favorites[j] == id) { document.getElementById('likebig' + id).innerHTML = `<img class="like-big" title="release the pokemon" src="./img/pokeball.png" onclick="removeFromFavoritesBig(${id})"></img>`; }
    }

}


function forLoopsForRenderCardBig2(id){
    for (let i = 0; i < stats[id]['name'].length; i++) {
        let statName = stats[id]['name'][i];
        let statNumber = stats[id]['baseStat'][i];
        document.getElementById('tableBig').innerHTML += `<tr class ="tr-big"><td class="td-left">${statName}:</td><td class="td-right">${statNumber}</td></tr>`;
    }
    for (let i = 0; i < 2; i++) {
        let abilityName = abilityNames[id][i];
        document.getElementById('tableBig').innerHTML += `<tr class ="tr-big"><td class="td-left">ability #${i + 1}:</td><td class="td-right" >${abilityName}</td></tr>`;
    }
}