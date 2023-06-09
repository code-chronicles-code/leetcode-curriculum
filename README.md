# webdev

## Main Quest: Hello World in Express

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

### Side Quest: bashrc/zshrc

## Main Quest: Setup of package.json

Here, we're going to want to create a `package.json` file for yarn. This file will store two main things for our project: a list of libraries (packages) that you can used in your code, and a list of "scripts" to simplify any long, repetitive commands you might come across.

First off, we're going to want to create a new folder to store our project - you can put this wherever you want and give it whatever name you want, just so long as you're not going to lose it. With your project folder created, you'll then want to navigate to it in your terminal (recall `cd` command) - make sure you don't skip this step, as accidentally creating your project in the wrong directory has been known to cause problems.

Once you're in this folder, you can tell yarn to set it up as a project by simply entering the command `yarn init`. This will prompt you to enter some info about your project, and for the purposes of learning you can answer just about anything here - when complete, it will create a new `package.json` file in your current (project) folder, concluding its basic setup.

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
    "format": "prettier --write ."
  }
}
```
