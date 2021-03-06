/*shows or closes the list */

function showList() {
    document.getElementById("mySidenav").style.width = "270px";
    document.getElementById('listpic').setAttribute('onclick', 'closeList()');
}


function closeList() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById('listpic').setAttribute('onclick', 'showList()');
    document.getElementById('input').value = ``;
    renderList();
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

/*loads the next cards to the mainpage */
function loadNext() {
    document.getElementById('next20div').innerHTML = '';
    renderCardSmall();
}



/* pushes pokemon to the favorite list or deletes it. */
function addToFavorites(i, event) {
    favorites.push(i);
    document.getElementById('like' + i).innerHTML = `<img class="like" title="release the pokemon" src="./img/pokeball.png" onclick="removeFromFavorites(${i}, event)">`;
    renderList();
    event.stopPropagation();
}


function removeFromFavorites(i, event) {
    let position = favorites.indexOf(i);
    favorites.splice(position, 1);
    document.getElementById('like' + i).innerHTML = `<img class="like"  title="catch the pokemon" src="./img/pokeball_open.png" onclick="addToFavorites(${i}, event)">`;
    renderList();
    event.stopPropagation();
}


function addToFavoritesBig(id) {
    favorites.push(id);
    document.getElementById('like' + id).innerHTML = `<img class="like" title="release the pokemon" src="./img/pokeball.png" onclick="removeFromFavorites(${id}, event)">`;
    document.getElementById('likebig' + id).innerHTML = `<img class="like-big" title="release the pokemon" src="./img/pokeball.png" onclick="removeFromFavoritesBig(${id})">`;
    renderList();
}


function removeFromFavoritesBig(id) {
    let position = favorites.indexOf(id);
    favorites.splice(position, 1);
    document.getElementById('like' + id).innerHTML = `<img class="like"  title="catch the pokemon" src="./img/pokeball_open.png" onclick="addToFavorites(${id}, event)">`;
    document.getElementById('likebig' + id).innerHTML = `<img class="like-big"  title="catch the pokemon" src="./img/pokeball_open.png" onclick="addToFavoritesBig(${id})">`;
    renderList();
}


function removeFromFavoritesWhileShown(element, event) {
    removeFromFavorites(element, event);
    showFavorites();

}

/*shows favorites or shows mainpage */
function showFavorites() {
    document.getElementById('cards').innerHTML = '';
    document.getElementById('headline').innerHTML = 'favorites';
    document.getElementById('next20div').innerHTML = '';
    document.getElementById('pokemonFavorite').setAttribute('onclick', 'closeFavorites()');
    document.getElementById('pokemonFavorite').src = "./img/pokeball_open.png";
    document.getElementById('pokemonFavorite').title = "show all pokemon";
    min = 0;
    max = 25;
    for (let i = 0; i < favorites.length; i++) {
        let element = favorites[i];
        let pokemonNumber = element + 1;
        htmlForRenderCardSmall(element, pokemonNumber);
        document.getElementById('like' + element).innerHTML = `<img class="like" src="./img/pokeball.png" title ="release pokemon" onclick="removeFromFavoritesWhileShown(${element}, event)"></img>`;
    }
}


function closeFavorites() {
    document.getElementById('headline').innerHTML = 'pokedex';
    document.getElementById('cards').innerHTML = '';
    document.getElementById('pokemonFavorite').setAttribute('onclick', 'showFavorites()');
    document.getElementById('pokemonFavorite').src = "./img/pokeball.png";
    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('pokemonFavorite').title = "show caught ones";
    renderCardSmall();
}

/*opens and closes the modal */
function modal(id) {
    document.getElementById("modal").classList.add('modal');
    document.getElementById("modal").classList.remove('d-none');
    renderCardBig(id);
}


function closeModal() {
    document.getElementById('bigcard').classList.add('modal-closing');
    setTimeout(() => {
        document.getElementById('bigcard').classList.remove('modal-closing');
        document.getElementById("modal").classList.remove('modal');
        document.getElementById("modal").classList.add('d-none');
    }, 220);

}


window.onclick = function (event) {
    if (event.target == document.getElementById("modal")) {
        closeModal();
    }
}