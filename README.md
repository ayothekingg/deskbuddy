# About DeskBuddy
## What is Deskbuddy?
Built on top of the [Pieces OS](https://www.npmjs.com/package/@pieces.app/pieces-os-client), Deskbuddy is a progressive web application that allows developers to uncover their strengths and weaknesses based on their day-to-day activities and then come up with solutions by offering helpful insights on your code and development activities. These may include getting your most used programming language off the data gotten from snippets and then getting random facts about the language, getting a list of your saved websites and other related websites, or simply getting a definite count on a particular activity and then making comparisons between periods to get an insight on your productivity. 
You can explore more endpoints and dive into the infinite possibilities of building with Pieces OS by checking out the readme on the Open Source by Pieces repo on GitHub.             

## What to Expect from the Deskbuddy Application
- Statistics and Insights on code: The Deskbuddy application will provide information about your code and overall development workflow. The idea behind this is for developers, while building applications and solving problems, to get insights into their activities after a given period.
Copilot Conversations: By leveraging the Pieces OS client, a custom copilot will be incorporated into the Deskbuddy application. The copilot will basically serve the purpose of providing information on your development activities when you ask for them. For instance, you can simply ask the copilot, “What website did I visit the most this week?”, and it replies accordingly. 
- View Related Links: One of the functionalities provided by the Pieces OS is getting a couple of related links when a snippet is saved. These links include the origin website(if the snippet was saved from the web) and other related links that enable developers to get more understanding and insights on that particular snippet. The action of saving snippets can be tied to working on a particular project/stack or seeking to learn more and perform actions on the snippet, which is why the Deskbuddy application aims to enhance these actions by providing a widget that contains recent related links for easy accessibility by the user. 
- Breakdown on Tech Stack: With the data from saved snippets, Deskbuddy gives a breakdown of the most used tech stacks by a particular user in a given period, ensuring users stay aware and up-to-date with their development activities and preferences. 
- Track your Productivity: From the biggest to the littlest piece of activity, Deskbuddy keeps track of all. Saved a piece of code? Added a new website? Made use of the Copilot? With Deskbuddy, you will be able to see all the actions you take, how frequently you take them, and make comparisons to determine your productivity in a given period. 

A Peek into the Technical Details of Deskbuddy: Exploring Endpoints to be Used
To utilize these endpoints, ensure you have the Pieces OS package installed. If you haven’t, you can do so by following the steps below:
Using npm:
```
npm install @pieces.app/pieces-os-client
```
Using pnpm:
```
pnpm add @pieces.app/pieces-os-client
```
You can then import the library for usage in your application inside of a file:
```
import * as pieces from '@pieces.app/pieces-os-client
```


All set up! You can then proceed to utilize the provided endpoints, some of which we will discuss in this documentation and also in subsequent docs. 

## The `ConnectorApi()` endpoint
The first step in making use of Pieces functionalities is to connect your application to the Pieces OS to facilitate communication between Deskbuddy and the server, this can be done by using the `.connect` method from the `ConnectorApi()` endpoint. An asynchronous function will be created and called to connect the Deskbuddy to the Pieces server. Before then, create your `tracked_application` object which contains information about the name, version and platform. Here’s an example:

```
const tracked_application = {
  name: Pieces.ApplicationNameEnum.Unknown,
  version: "0.0.1",
  platform: Pieces.PlatformEnum.Macos,
};
```

You can then proceed to create an asynchronous function:

```
async function connect(): Promise<JSON> {
  const connectorApi = new Pieces.ConnectorApi();
  const response = await connectorApi.connect({
    seededConnectorConnection: { application: tracked_application },
  });
  //  console.log(response); you can log response just to confirm
  return JSON.parse(JSON.stringify(response));
```

Here, we create a `connect()` asynchronous function that returns a JSON object and then proceed to use the `.connect` method, passing the `seededConnectorConnection` property as an object, which also takes in the application property(data about the `tracked_application` passed in as an object). After successfully connecting with the Pieces OS by following these steps, your application should be up and running. 

## The `AssetsApi()` endpoint
The `AssetsApi()` endpoint is an important and interesting endpoint in the development of Deskbuddy as it contains data on snippets (assets) and offers a wide range of functionalities for operations such as create, delete, search, etc. When you call your `assetsSnapShot()` and pass an empty object as the `requestParameter`, the asset is returned, which contains a variety of properties and information on a particular snippet. With the `AssetsApi()` endpoint, you can:
- Create, update and delete assets. 
- Get a definite number of snippets present at a given period. 
- Seek to get extra context on a particular snippet of code by accessing a list of related websites for further reading and research.
- Stay extra aware of your coding activities by viewing the languages you use the most.
- Expand your knowledge by getting helpful suggestion queries relating to a snippet.

## Getting Started with Assets: Creating A New Asset
Having a fair knowledge of assets is important in the build process of Deskbuddy and generally using the Pieces SDK. Assets are primarily used to manage seeded data that comes into the application. The asset object provides data on snippets and the ability to manipulate them. In this section, I will walk you through performing basic operations on assets such as creating, updating, and deleting.

### Creating Assets
Remember the primary purpose of assets is to manage the seeded data that comes into the application. So, the first step will be to define the `SeededAsset`, which defines the structure of an asset object and stores the information about an asset. 

```
let seededAsset: SeededAsset = {  
    application: Application,  
    format: {  
        fragment: {  
            string: { raw: '< text here>' }    
        }
    }
}
```
Then go ahead and create your seed here (which will be passed as a `requestParameter` in creating your asset):
```
let seed: Pieces.Seed = {
      asset: seededAsset,
      type: SeedTypeEnum.Asset
  }
```
With that set up, you can proceed to create your asset by using the `assetsCreateNewAsset` method from the `AssetsApi()` endpoint: 
```
new Pieces.AssetsApi().assetsCreateNewAsset({seed: _seed}).then(assets => {
console.log("Here is the asset created": assets)
```
You can then check the several properties and information on snippets in an asset. 

Getting Snippet Count with `.AssetsSnapshot()`
Curious to know and keep track of the total number of snippets at any given time? You can achieve this by using the `.AssetsSnapshot `method from the `Assets.Api() ` endpoint. When you pass in an empty object as the `requestParameter` in the `.AssetsSnapshot` method, you get the full information on all the snippets present in the application. Here’s an example:
```
new Pieces.AssetsApi().assetsSnapshot({}).then((assets) => {
       console.log('Here is your asset snapshot: ', assets)
```
With this method, you can:
- Get the total number of snippets present in the application. 
- Get information on a particular asset in the application by targeting its ID.
- Perform operations such as updating and deleting an asset. 
- Keep track of your coding activities by making comparisons between assets. 


Expanding Your Horizon of Knowledge with the `.websites` Attribute
A common activity of every developer, irrespective of skill level, is learning. The `.websites` attribute allows you to easily access helpful resources(websites) that relate to your code. In addition to providing data around a snippet such as the name, anchors, and tags, the `AssetsApi` endpoint gives you access to a list of all websites present in the application. Similar to other functionality in communicating with the API, you can use `.websites` for a number of things:  

- Counting the total number of websites that have been collected over time 
- Give a rank of your most visited sites in a given period
- View all code that is currently related to a specific website 
- View how many times a website has been added to anything and is related to some data you have
With `AssetsApi()`, you can get the ID of a specific asset and then proceed to read some data from that particular asset - in this case, the `.website`. Here’s an example below:
```
// example to get website data from a single asset
new Pieces.AssetsApi().assetsSnapshot({}).then((_) => {
  var firstAsset = _.iterable[0].id;
  new Pieces.AssetApi().assetSnapshot({asset: firstAsset}).then((_a) => {
    var assetWebsite = _a.websites.iterable[0];
    console.log(assetWebsite);
  })
})
```
Here we pass in an empty object(as previously mentioned) as a `requestParameter` in the `.assetsSnapshot`. We then proceed to get the ID of the first asset which will also serve as a `requestParameter` for `.assetSnapshot()`(note this is without the “s”) from the `AssetApi()` endpoint. The `AssetApi()` endpoint returns data on a single asset. It provides a more direct way to manage data and perform further operations on an asset. After the ID of a specific asset is passed in, we can then proceed to get the website associated with that particular asset by using the `.websites` attribute. You can also get the data of all websites associated with a particular snippet.

## The `ActivitiesApi()` endpoint
The `ActivitiesApi()` endpoint, as you would guess, offers the functionality of managing your development activities. The  `ActivitiesApi()` allows you to create, delete, and get a snapshot of all the available activities present in the application. The idea behind tracking development activities is to allow developers to stay aware of all they do and take conscious actions to boost their productivity.  With the `ActivitiesApi()` endpoint, you can:
- Track all your coding activities
- Get a definite of all your activities in a given period
- Get to know what activity you love doing most and get a weekly recap
- Make comparisons to see how your development workflow changes over time

Similar to the operations on the `AssetsApi()` endpoint, the `.activitiesCreateNewActivity` method from the `ActivitiesApi()` endpoint handles the creation of a new activity and then you can get a history of all activities created through the `.activitiesSnapshot()` method. Here’s an example:
```
new Pieces.ActivitiesApi().activitiesSnapshot({}).then((activity) => {
       console.log('Here are your activities', activity)
}
```

## Interested in Contributing? There’s a spot for you!
Being an open source project, we’re always happy to welcome new contributors! The Deskbuddy application will be built with React and primarily with the help of the Pieces TypeScript SDK. We’ve got a couple of interesting open issues for you to get started with building. Before you begin, here are a few tips to know and tools you need to have installed or get familiar with just so you have a head start:

- Download the [Pieces for Developers package](https://docs.pieces.app/installation-getting-started/what-am-i-installing), which installs the Pieces OS and Pieces for Developers Desktop Application. The Deskbuddy application will run on Pieces OS.
- Install the Pieces NPM package and get familiar with its documentation.
- Check out the Example-TS repository to see some of these endpoints in action.
- Check the open issues on Deskbuddy and feel free to share your thoughts in the discussion board. 


