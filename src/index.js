require('dotenv').config();

const axios = require('axios')
const { Client } = require("@notionhq/client")
const notion = new Client({auth: process.env.NOTION_KEY})// Initializing a client
const pokeArray = [] 

async function getPokemonData(){
    for(let i = 1; i<= 10 ; i++){
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((poke) => {
                const typesArray = []
                for(let t of poke.data.types){
                    const typeObject = {
                            "name" : t.type.name
                        }
                    typesArray.push(typeObject)
                }
                
                const sprite = (!poke.data.sprites.front_default) ? poke.data.sprites.other['official-artwork'].front_default : poke.data.sprites.front_default;
                
                const pokeData = {
                        "name" : poke.data.name,
                        "id" : poke.data.id,
                        "hp" : poke.data.stats[0].base_stat,
                        "types": typesArray,
                        "sprite": sprite,
                        "artWork": poke.data.sprites.other['official-artwork'].front_default

                }
                pokeArray.push(pokeData)
                console.log(`Fetching ${pokeData.name} from PokeAPI.`)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    createNotionPage()
}

getPokemonData() 

async function createNotionPage(){
    for(let pokemon of pokeArray){
        console.log("Sending data to notion. . .")
        const response = await notion.pages.create({
            "parent": {
                "type": "database_id",
                "database_id" : process.env.NOTION_DATABASE_ID
            },
            "cover": {
                "type": "external",
                "external":{
                    "url" : pokemon.artWork
                }
            },
            "icon": {
                "type": "external",
                "external":{
                    "url" : pokemon.sprite
                }
            },
            "properties": {
                "NAME":{
                    "title":[
                        {
                            "type": "text",
                            "text":{ "content": pokemon.name }
                        }
                    ]
                },
                "ID":{ "number": pokemon.id },
                "HP":{ "number":  pokemon.hp },
                "TYPES":{"multi_select": pokemon.types},
            }
        })
        console.log(response)
    }
}