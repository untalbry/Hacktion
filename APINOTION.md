#  DEMO POKEAPI WITH NOTION API 

We required axios and Notion API : 

Using npm: 

```bash
npm install axios
```


```bash
npm install @notionhq/client
```
And for learning we are going to use the famous <a href="https://pokeapi.co/">POKE API</a>. <br>
You need to create 2 enviroment variables, one for Notion Token (Internal integration secret) and the other for the data base id that we are going to connect later.

First in Notion you have to open `settingsAndMembers/myConnection`. In the buttom of the page you can see this three options: 
![mannageIntegrations](https://github.com/xVrzBx/Hacktion/assets/91161604/a9a978cc-f48d-4e77-8fdc-41db6dbad297)

Select <a href="https://www.notion.so/my-integrations">`Develop or manage integrations` </a> 

![notionIntegrations](https://github.com/xVrzBx/Hacktion/assets/91161604/89cc62f2-e13c-4084-8e18-ae97f936c1dc)


>[!NOTE]
> You can also visit the <a href="https://developers.notion.com/">official Notion API documentation</a>

You can associate a Notion workspace, add a name and a logo for your integration:  <br><br>
![notionIntegration2](https://github.com/xVrzBx/Hacktion/assets/91161604/18cb8f71-8e2c-4025-9cf5-29e1ddac99ca)
After that it generates a Secret (your token): <br><br>
![notionIntegration3](https://github.com/xVrzBx/Hacktion/assets/91161604/db131672-108e-4dc4-94d6-14b71360d2eb)
You can configurate the API capabilities <br><br>
![notionIntegration4](https://github.com/xVrzBx/Hacktion/assets/91161604/2af702c0-ef94-4848-a7bc-271ac58ccb2e)
And the distribution: <br><br>
![notionIntegration5](https://github.com/xVrzBx/Hacktion/assets/91161604/333f7df3-1adc-4024-b669-220ddcb931a2)

After that you have to create an `.env` file for storage the Token and the data base id:

```
NOTION_KEY = "YOUR_TOKEN_GOES_HERE"
NOTION_DATABASE_ID = "YOUR_DATA_BASE_ID_GOES_HERE" 
```

>[!IMPORTANT]
> Before an integration can interact with your Notion workspace page(s), the page must be manually shared with the integration. To share a page with an integration, visit the page in your Notion workspace, click the ••• menu at the top right of a page, scroll down to Add connections, and use the search bar to find and select the integration from the dropdown list.

Now we are going to create our `index.js` file for our proyect. In this file we need to configure `dotenv` to connect our 
`.env` to our `index` file adding also `axios` and notion client: 
``` javascript
require('dotenv').config();

const axios = require('axios')
const { Client } = require("@notionhq/client")
const notion = new Client({auth: process.env.NOTION_KEY})// Initializing a client

```

Also we need to create an array for save all the data that we are going to take from de Poke API: 

```javascrit
  const pokeArray = [] 
```
And for get the data we are going to make an `async` function were with `axios` we are going to use the `get` method to get a response from an endpoint and with that data we create an object por save it in the array: 
```javascript
  //For take the first pokemon data
await axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
.then(poke) -> {
  //this code is for get an array for all the types from the pokemon 
  const typesArray = []
  for(let t of poke.data.types){
    const typeObject = {
      "name" : t.type.name
    }
    typesArray.push(typeObject)
  }
  const pokeData = {
    "name" : poke.data.name,
    "id" : poke.data.id,
    "hp" : poke.data.stats[0].base_stat,
    "types": typesArray,
    }
    pokeArray.push(pokeData)
  }.catch((error) => {
    console.log(error)
})
```
I toke the atributes from the oficial <a href="https://pokeapi.co/">Poke API documentation</a> that make the object. 
<br>
Now we need to take a look to the Notion API documentation for knowing how to insert data to a data base, because as we saw, Notion has a lot of tipes of atributes (number, multi-select, text, url, etc.), soo we need to see what kind of data are we taking from the poke API and how to insert it into a data base: 

First we need to create a page for our database :

```javascript
const response = await notion.pages.create({
  // Here you create a notion page for your database
  "parent" : {
    "type": "database_id",
    "database_id": process.env.NOTION_DATABASE_ID
  },
  "properties":{
    //here you define the values for the data base files 
  }
})
```
Now i'm going to show you how to insert types of atributes: <br>
Number: 
``` javascript
"properties":{
  "NAME OF YOUR COLUMN": {
    "number" : //a number value goes here
  }
}
```
Text:
``` javascript
"properties":{
  "NAME OF YOUR COLUMN":{
    "title":[
    {
      "type": "text",
      "text":{ "content": //A text value goes here }
    }
  ]},
}
```
Multi-Select:
```javascript
"properties":{
  "NAME OF YOUR COLUMN": {
    "multi_select" : //an array goes here
    }
}
```
After all this info we can build our pokemon page in notion: 
```javascript
const response = await notion.pages.create({
  "parent": {
    "type": "database_id",
    "database_id" : process.env.NOTION_DATABASE_ID
  },
  "properties": {
    "NAME":{
      "title":[
      {
        "type": "text",
        "text":{ "content": pokemon.name }
      }]
    },
    "ID":{ "number": pokemon.id },
    "HP":{ "number":  pokemon.hp },
    "TYPES":{"multi_select": pokemon.types},
    }
})
```
Soo now we can get a pokemon data an insert it into notion with this code: 
```javascript
require('dotenv').config();

const axios = require('axios')
const { Client } = require("@notionhq/client")
const notion = new Client({auth: process.env.NOTION_KEY})// Initializing a client
const pokeArray = [] 

async function getPokemonData(){
  await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
  .then((poke) => {
    const typesArray = []
    for(let t of poke.data.types){
      const typeObject = {
        "name" : t.type.name
      }
      typesArray.push(typeObject)
    }
    const pokeData = {
      "name" : poke.data.name,
      "id" : poke.data.id,
      "hp" : poke.data.stats[0].base_stat,
      "types": typesArray,
    }
    pokeArray.push(pokeData)     
  }).catch((error) => {
    console.log(error)
  })
  createNotionPage()
}

getPokemonData()

async function createNotionPage(){
  for(let pokemon of pokeArray){
    const response = await notion.pages.create({
      "parent": {
        "type": "database_id",
        "database_id" : process.env.NOTION_DATABASE_ID
      },
    "properties": {
      "NAME":{
        "title":[
        {
          "type": "text",
          "text":{ "content": pokemon.name }
        }]
      },
      "ID":{ "number": pokemon.id },
      "HP":{ "number":  pokemon.hp },
      "TYPES":{"multi_select": pokemon.types},
      }
    })
  }
}


```
![pokeapidone](https://github.com/xVrzBx/Hacktion/assets/91161604/c6aa534d-eb93-430e-8e32-e8d63c5a68c6)
