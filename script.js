

async function loadPokemonUrls() {
    let urlPokemonList = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let response = await fetch(urlPokemonList);
    let responseAsJson = await response.json();
    for (let i = 0; i <responseAsJson.length; i++) {
    let allPokemonArray = responseAsJson['results'][i]['url'];
        let urlPokemon = allPokemonArray;
        let responsePokemon = await fetch(urlPokemon);
        let responsePokemonAsJson = await responsePokemon.json();
        let name = responsePokemonAsJson['name'];
        let urlArtwork = responsePokemonAsJson['sprites']['official-artwork']['front_default'];
        let types
        let baseStats
        let StatName
        let abilityName
        let weight = responsePokemonAsJson['weight'];


    }
}





/* 


types ->iterate with length ->type > name


stats -> iterate with length -> base_stat
                             -> stat -> name

abilities -> iterate with length -> ability -> name                             


*/