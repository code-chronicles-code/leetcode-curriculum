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
