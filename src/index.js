const axios = require('axios')

const { Client } = require("@notionhq/client")
// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const pokeArray = [] 

async function getPokemon(){
    await axios.get('https://pokeapi.co/api/v2/pokemon/1')
    .then((poke) => {
        console.log(poke)
    })
    .catch((error) => {
        console.log(error)
    })
}

getPokemon() 