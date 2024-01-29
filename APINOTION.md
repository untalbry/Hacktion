#  DEMO POKEAPI WITH NOTION API 

We required axios and Notion API : 

Using npm: 

```bash

npm install axios
```


```bash
npm install @notionhq/client
```

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

