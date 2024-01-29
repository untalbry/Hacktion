require('dotenv').config();

const axios = require('axios')

const { Client } = require("@notionhq/client")
// Initializing a client
const notion = new Client({auth: process.env.NOTION_KEY})

const pokeArray = [] 

async function getPokemon(){
    await axios.get('https://pokeapi.co/api/v2/pokemon/2')
    .then((poke) => {
       const pokeData = {
            "name" : poke.data.name,
            "id" : poke.data.id,
            "hp" : poke.data.stats[0].base_stat
       }
       pokeArray.push(pokeData)
       console.log(`Fetching ${pokeData.name} from PokeAPI.`)
    })
    .catch((error) => {
        console.log(error)
    })
    createNotionPage()
}

getPokemon() 

async function createNotionPage(){
    for(let pokemon of pokeArray){
        console.log(process.env.NOTION_KEY)
        console.log("Sending data to notion. . .")
        const response = await notion.pages.create({
            "parent": {
                "type": "database_id",
                "database_id" : process.env.NOTION_DATABASE_ID
            },
            "properties": {
                "Name":{
                    "title":[
                        {
                            "type": "text",
                            "text":{ "content": pokemon.name }
                        }
                    ]
                },
                "ID":{ "number": pokemon.id },
                "HP":{ "number":  pokemon.hp }
            }
        })
        console.log(response)
    }
}