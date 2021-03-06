Prerequisites
-------------

- [Node.js v12.14.0+](http://nodejs.org)
- [MongoDB](https://www.mongodb.com/download-center/community) OR [MongoAtlas](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/downloads)
- Command Line Tools

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/nghiemldbhsoft/node-example.git yourprojectname

# Change directory
cd yourprojectname

# Install NPM dependencies
npm install

# Then simply start your app
node index.js
```

Project Structure
-----------------
| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **controllers**                    | Controller for all api request, response                     |
| **services**                       | Api's service                                                |
| **models**                         | Mongoose schemas and models                                  |
| **routes**                         | All api route                                                |
| index.js                           | The main application file.                                   |
| .env.example                       | Your tokens, passwords and database URI.                     |
| .gitignore                         | Folder and files ignored by git.                             |
| package.json                       | NPM dependencies.                                            |
| package-lock.json                  | Contains exact versions of NPM dependencies in package.json. |




