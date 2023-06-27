# webdev

## Chapter 0: Ready Your Terminal

It's dangerous to go alone! You'll need a trusty terminal to aid you in your journey. Which operating system do you wield?

### If Mac

TODO: insert message about how the terminal is already great, but recommend installing Homebrew

### If Windows

TODO: describe how to install WSL

### Users of Other Operating Systems

TODO: insert clever message about how the reader is a rare kind of person and most likely already has a great terminal

## Chapter 1:

First thing first we'd like to install a couple of tools that we'll be using in our journey. To get started we'll need `nvm`, `node`, and `yarn`. `nvm` is not nevermind. nvm is a node version manager to manage your node version. `node` is a program that will let us run a server on our computer. `yarn` is a package manager to help us manage javascript packages.

You could install nvm via cURL with the following command:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Now that we have nvm installed, we can install node with the following command:

```sh
nvm install node
```

Now that we have node installed, we can install yarn with the following command:

```sh
corepack enable
```

You could double check you've installed all of the above successfully by running:

```sh
which nvm
which node
which yarn
```

If any installation step failed you'll see `______ not found`. If you don't see that then you're ready to continue on your quest, fellow coder.

The next step would be to add express to your project, which can be done using a simple yarn command

```
yarn add express
```

If you open your project file in an editor (we at code chronicles like using VS code because it's good), you can see a console.log() statement which you can edit as per your liking.

### Side Quest: bashrc/zshrc

## Main Quest: Setup of package.json

Here, we're going to want to create a `package.json` file for yarn. This file will store two main things for our project: a list of libraries (packages) that you can used in your code, and a list of "scripts" to simplify any long, repetitive commands you might come across.

First off, we're going to want to create a new folder to store our project - you can put this wherever you want and give it whatever name you want, just so long as you're not going to lose it. With your project folder created, you'll then want to navigate to it in your terminal (recall `cd` command) - make sure you don't skip this step, as accidentally creating your project in the wrong directory has been known to cause problems.

Once you're in this folder, you can tell yarn to set it up as a project by simply entering the command `yarn init`. This will prompt you to enter some info about your project, and for the purposes of learning you can answer just about anything here - when complete, it will create a new `package.json` file in your current (project) folder, concluding its basic setup.

## Main Quest: Running the project

### Side Quest: Running it using the node command

Once the package.json file is done with the initial setup, we can now run the our project and see how it looks on the browser.

To run the project, go into your terminal and type the following command,

```
node main.js
```

### Side Quest: Running it using the scripts

The above commad for the future steps can become difficult to use and redundant in the future. Keeping our goals in mind, running our project using this method will make it easier.

In your package.json, we will be editing the scripts as follows:

```json
{
  "scripts": {
    "start": "node main.js"
  }
}
```

Once this has been added in your package.json, save all the changes and type the following command in your terminal.

```
yarn start
```

This might look like an extra step now but once we start adding & building more stuff this would come handy and would make the whole process a lot easier.

## Main Quest: Hello World via React

## Prettier

To install prettier, run:

```sh
yarn add --dev --exact prettier
```

Prettier should have a configuration file, for example `.prettierrc.json`. It can be created by running:

```sh
echo {} > .prettierrc.json
```

Below is a simple config, more info can be found here: [Prettier config](https://prettier.io/docs/en/configuration.html)

```
{
  "bracketSameLine": true,
  "quoteProps": "consistent",
  "singleQuote": true,
  "trailingComma": "all"
}
```

Create a `.prettierignore` file in the root of your project to indicate which files should not be formatted. It can include the same content as `.gitignore` plus any additional directories that should not be formatted.

To make `.prettierignore` match `.gitignore` content, run:

```sh
cp .gitignore .prettierignore
```

It's also useful to have a specific npm/yarn script under scripts in `package.json`, for example:

```json
{
  "scripts": {
    "start": "node main.js",
    "format": "prettier --write ."
  }
}
```

## Side Quest: Shell greetings!

Are you lonely? Craving companionship? Looking for a relationship with your laptop? Look no further, because you are in the right place.

~/.zprofile is our startup/shutdown file for the zsh shell.
There's also a cousin, ~/.zshrc, which is an interactive file read while our shell is running. This config file is written in a scripting language specific to the shell, which in this case is **Zsh**. Feel free to take a look at the ZSH [documentation](https://zsh.sourceforge.io/Doc/Release/Files.html#Files) for more info.

To cd to home directory and open the zprofile file, run:

```
cd ~ && open .zprofile
```

Next, you have the option to do what I (ethan) did and use chat GPT to write a script. Here's an example:
`write me a script for my zprofile that greets me according to the time of day`  
`write me a script for my zprofile that greets me according to the time of day`  
Which would give:

```
#!/bin/zsh

hour=$(date +%H)
greeting=""

if (( hour >= 5 && hour < 12 )); then
    greeting="Good morning"
elif (( hour >= 12 && hour < 18 )); then
    greeting="Good afternoon"
else
    greeting="Good evening"
fi

echo "$greeting! Welcome back!"
```

There's no limit to how much you can customize your .zprofile!
There's no limit to how much you can customize your .zprofile!

In case you're curious what _my_ .zprofile looks like:

In case you're curious what _my_ .zprofile looks like:

```
current_hour=$(date +%H)

if ((current_hour >= 2 && current_hour < 5 )); then
    echo "Ethan, venture into the depths of the pre-dawn hours with caution, for the productivity that dwells within holds a power both intoxicating and perilous. It is a path reserved for the bold, the restless, and the mad."
elif (( current_hour >= 5 && current_hour < 12 )); then
elif (( current_hour >= 5 && current_hour < 12 )); then
    echo "Good Morning, Ethan"
elif (( current_hour >= 12 && current_hour < 17 )); then
    echo "Good Afternoon, Ethan"
elif ((current_hour >= 17 && current_hour < 24)) || ((current_hour >= 0 && current_hour < 2)); then
    echo "Good Evening, Ethan"
fi
```

## Main Quest: Add name to Authors via pull request.

First, we need to install GitHub CLI with:

```sh
apt-get install gh
sudo apt-get install gh
```

Next, we need to authenticate with:

```sh
gh auth login
```

After authenticating and selecting project to work on with :

```sh
gh repo clone code-chronicles-code/webdev
```

We need to make a new branch with the command

```sh
git branch name/add-to-author
```

This will add a new branch and we can switch to the new branch with command

```sh
git checkout name/add-to-author
```

Before committing to changes we need to add signatures for changes with commands:

```sh
git config --global user.name
git config --global user.email
```

Now we can edit with and enter name in alphabetical order:

```sh
code AUTHORS
```

We need to do

```sh
git add .
```

We commit file with command

```sh
git commit
```

Next we execute the command:

```sh
gh pr create
```

Now we switch to the main branch

```sh
git checkout main
```

Delete old branch

```sh
git branch -D name/add-to-author
```

Finally, we run and wait for review.

```sh
git pull
```

## Setting up Webpack

- add webpack

### Adding Webpack

What is webpack? It is designed primarily for JavaScript, but if the appropriate loaders are included, it can also transform front-end assets like HTML, CSS, and images. When given dependencies-containing modules, Webpack creates static assets to represent those modules.

Read more about webpack here, https://webpack.js.org/

Basically, in our project we use webpack, so that we don't need to kill and restart the server everytime we make the changes in the client side.

## Creating the webpack.config.js file

Create a webpack.config.js file in the root directory of your project folder and write the code mentioned below.

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

### Setting the location of the packages in webpack config file

When you add the below code in you file make sure you update the the path of "entry" & "path" in the output with client.tsx and client.js in the build folder.

```
const path = require('path');

module.exports = {
  entry: "./src/client.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "client.js",
  },
};
```

### Runing the project with webpack

To run your project with webpack, just type `yarn webpack --mode development --watch` in a seperate terminal and keep it running till the time you want to.

After this, in a different terminal use the regular `yarn start` command to run your project.

NOTE: Although any changes made to the server side code, you will have to kill the running webpack code and redo the whole process.

### Make a script in your package.json

Making a script would be helpful for running the all the commands together and we recommed to edit it something like the code provided below.

```
"scripts": {
    "start": "ts-node src/main.tsx",
    "build": "webpack --mode development --watch",
    "format": "prettier --write .",
    "start-full": "yarn build && yarn start"
  }
```

### Run it all!

To run in all just say `yarn start-full` in your terminal. Once you do check your local host, now any changes that you make to your client side code you can see those changes being updated as soon as you reload the browser.
