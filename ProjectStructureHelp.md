**Project Structure**

src:

    This is where the main react app files to the application are located. We will only keep App.js and index.js here as this will be the entry point of our react app.

**Major Folders Under Source Folder**

assets:

    Styles: Only for global styles and declaration of globall css variables.

    Images and videos: Can have their folders here. Although only for the essenstials. As putting assets here will put them in the build code which will decrease build speeds and increase size. Normally other images and video go into the public folder.

components:

    Each component should have its own folder matching the name of the component. i.e. NavBar component should be in a folder named "NavBar". Within in each folder, the testing files and module styles are located. Note, only resusable components should be stored here, otherwise for page specific components, they will be stored under their respective page folders. Also, These components should generally by stateless.

pages:

    Here will be all the pages of our application. A page is a combination of components, and will mostly likely store some state. Here will be all components that are specific to this page only, its test files, and style modules.

api:

    Here will be where we store custom functions for our api calls as well as our instance of Axios.
