# Setting up the project

### `docker-compose run --rm npm-frontend npm install`

### `docker-compose up -d frontend --build`

The app runs in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This project uses [Prime React](https://primereact.org/) and basic css for styling.

## Description

Here we have the initial 3d piece of a bigger project i am working on, i still have to add backend and database plus some frontend properties to make it full circle.

- For now when you view the project on the browser, you will see a basic wardrobe with its components (left panel, glass, top , right panel ecc) independent from each other.
- When you click on each component a modal opens with the basic dimensions of the component, you can edit these dimensions, save the edit and see in how the component changes in real time.
- I realized each component from scratch using blender and imported them because three.js components have a low quality definition.

### `docker-compose up -d mysql backend frontend npm-backend --build`
