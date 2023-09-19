# React/Next.js Template

[See Live Demo of this Template](https://drt-next-js-template.netlify.app/)

## Topics
- [Get Started](#get-started)
- [Starting the Project](#starting-the-project)
- [Using axios](#using-axios)
- [Deploying on Netlify](#deploying-on-netlify)
___
## Getting Started
### Use Template
#### 1. To get started, click the GREEN "Use this Template" button at the top of the repo
<img width="915" alt="Screen Shot 2022-07-06 at 12 54 01 PM" src="https://user-images.githubusercontent.com/29741570/177612998-4aac9237-5a1e-4f13-8ae0-468587521564.png">

#### 2. Make sure YOUR github account is selected in the dropdown and name your project
<img width="763" alt="Screen Shot 2022-07-06 at 12 54 48 PM" src="https://user-images.githubusercontent.com/29741570/177613126-dd38f678-7553-4f27-8a4a-75680f14d71e.png">

#### 3. Clone your new repo to your local machine
#### 4. Go to the **NEXT** section

## Starting the Project
1. Create a Firebase project and set up authentication. Use [these videos](https://vimeo.com/showcase/codetracker-firebase) as a refresher if needed.
1. Create a `.env` file at the root of the project
1. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
1. Copy over all of your Firebase values into the `.env` file.
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
1. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

### If you see this, you are set to go!
<img width="450" alt="Screen Shot 2022-07-06 at 1 07 27 PM" src="https://user-images.githubusercontent.com/29741570/177615077-9b6a75bc-0260-4d29-bb88-bd95a3140687.png">


You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

**NOTES:** 
- If you see the following error, you did not follow all the setup steps correctly and failed to add your Firebase creds. Go back and do that NOW.

<img width="1043" alt="Screen Shot 2022-07-06 at 11 18 45 AM" src="https://user-images.githubusercontent.com/29741570/177612501-c2628f18-4bbd-4de9-aae6-27ffba1172d6.png">

### Deploying on Netlify
Netlify will automatically detect your project and prepopulate the settings, but should something go wrong and it does not, here are the commands:

- Build Command: `npm run build`
- Publish directory: `.next`

#### Additional Steps to Take on Netlify
- Add Environmental Variables
    - Any Enviromental variables you are using in your `.env` file should be added to Netlify. 
        - Go to Site settings > Build & deploy > Environment > Environment variables and the keys and values there.

- Update Firebase URL Settings
    - In Firebase under Authentication select sign in methods, scroll to Authorized domains. Add your Netlify URL.
        
## Learn More about Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


command to run local server: npm run dev 
command to donwload necessary modules: npm i
(additional info referenced above)

Link to wire frames: https://whimsical.com/your-skate-spots-EhzU8JXrLSfgfpYNEbpK52
Link to ERD: https://dbdiagram.io/d/Skate-Spot-64dabce302bd1c4a5ec5bd38

Skate Spot is a react app that allows users to create, update, edit, and delete skate locations. The user is able to note the terrain, slope, and business of a locations, as well as rate the overall difficulty. Users can share their locations by making them "public" which puts them on the community page. From the community page, you can view and favorite others users locations. 

## Name of the Project: 
Skate Spot
## Overview of the project: 
Skate Spot is a react app that allows users to track and manage skate locations they have visited, or wish to visit!
## Link to your wireframes/prototype: 
Link to wire frames: https://whimsical.com/your-skate-spots-EhzU8JXrLSfgfpYNEbpK52
## Link/screenshot of data flowchartL 
Link to ERD: https://dbdiagram.io/d/Skate-Spot-64dabce302bd1c4a5ec5bd38
## Link to the deployed project 
https://chipper-chaja-c791bc.netlify.app/

## Description of the user and the problem you are solving for them: 
The user is a skater that wants to keep track of all their skate locations around town. They want to remember specific features about each location.

## List of features - 
Create, view, update, and delete skate locations. Serach for skate locations based off of location name or feature (smooth, bumpy, busy, etc.). Can filter by favorite locations or by neighborhood. Can view other users locations on the "community" page - user can favorite other users locations. 

## Screenshots of your project  - 

## Link to Loom video walkthrough of your app (no more than 1 minute long! Make it great)
