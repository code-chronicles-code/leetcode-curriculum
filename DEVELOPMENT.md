# Development Guide

This document aims to get you up-and-running developing on this project! If after reading this document, you aren't sure how to start developing, please [create an issue](../../issues/new) describing what's unclear, so we can improve the documentation.

## Prerequisites

At a minimum, you will need:

- Node.js, version 20 or higher
- Yarn 4+
- a Bash shell

For the most enjoyable development experience, or if you plan to contribute to the [Adventure Pack](workspaces/adventure-pack/), you will additionally need:

- Python 3.10 or higher
- a Java compiler, version 21 or higher

See below for more context on each prerequisite and how to install it.

### Node

This project is structured as a Node module, using Yarn as the package manager. So even if you don't intend to write any TypeScript/JavaScript code, it will be beneficial to have a recent version of Node, so you can run the repository management code, which is generally written in TypeScript or JavaScript.

We recommend installing Node using the Node Version Manager (`nvm`). Follow the installation instructions at https://nvm.sh/ then:

```sh
# Install the latest available Node version:
nvm install node

# Verify that the Node version is 20 or higher:
node -v
```

### Yarn

As mentioned, [Yarn](https://yarnpkg.com/) is the package manager we currently use for the TypeScript/JavaScript code. If you have a recent version of Node, you will have access to all the package managers your heart desires, though you may need to enable them using [Corepack](https://nodejs.org/api/corepack.html):

```sh
# The `corepack` command is distributed with Node.
corepack enable

# Verify that you have a Yarn command now:
yarn -v
```

The exact version of Yarn you have is most likely not essential at this point, when we use Yarn later it should be smart enough to anchor itself to the version mentioned in the `packageManager` field of the project's [`package.json`](package.json).

### Bash

There are a handful of places in the code where we assume that a `bash` command exists, notably [when spawning some repository commands](workspaces/repository-scripts/src/runCommands.ts) and [when trying to figure what is the right Python executable](workspaces/adventure-pack/goodies/python3/run_python.sh).

Although Bash's market share among shells is no longer unchallenged, lots of systems typically still ship with it, so start by checking if you have a `bash` command already:

```sh
# The `-v` flag appears to mean "verbose", so we have to be more verbose:
bash --version
```

If it turns out that you _do_ need to install Bash, some options are:

- **On Linux:** `sudo apt-get install bash` (for Debian/Ubuntu-based distributions) or the analogous command for your system's package manager
- **On Mac:** get [Homebrew](https://brew.sh/) (by some means besides the Bash installer script!) then `brew install bash`
- **On Windows:** get the [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) then pretend you have a Linux system

### Python

We use Python for the Python goodies in the [Adventure Pack](workspaces/adventure-pack/). If you're going to develop exclusively in another package, you should be able to get by without Python, but you'll have to change your working directory to that specific package. Otherwise, the `package.json` scripts mentioned below will be scoped to the entire repository, which includes attempting to work with the Python files in the Adventure Pack.

If you're working with the Adventure Pack code but don't intend to touch the Python goodies, you can try to get by without Python, but it won't be very fun. Scripts like `yarn format` cover all the goody languages, for simplicity. However, you can try the more targeted scripts defined in the [Adventure Pack's `package.json`](workspaces/adventure-pack/package.json). There are plans to decouple things so that down the line when we support a lot more languages we won't accumulate a ton of required prerequisites, but for now it'll be easiest to have Python (and Java).

Python ships with many systems, so start by checking if you have it already:

```sh
# Like Bash, the `-v` flag means "verbose".
python -V

# Because of the history of Python 2 and Python 3, sometimes the executable
# name is explicit:
python3 -V
```

<!-- TODO: add more detail -->

If you need to install Python, a good option is to do so through [`pyenv`](https://github.com/pyenv/pyenv) (or its Windows fork [`pyenv-win`](https://github.com/pyenv-win/pyenv-win)), which will allow you to manage multiple Python versions.

<!-- TODO: add more detail -->

### Java

We use a Java compiler for the Java and Kotlin goodies in the [Adventure Pack](workspaces/adventure-pack/). If you're going to develop exclusively in another package, you should be able to get by without a Java compiler, but you'll have to change your working directory to that specific package. Otherwise, the `package.json` scripts mentioned below will be scoped to the entire repository, which includes attempting to work with the Java and Kotlin files in the Adventure Pack.

If you're working with the Adventure Pack code but don't intend to touch the Java or Kotlin goodies, you can try to get by without a Java compiler, but it won't be very fun. Scripts like `yarn format` cover all the goody languages, for simplicity. However, you can try the more targeted scripts defined in the [Adventure Pack's `package.json`](workspaces/adventure-pack/package.json). There are plans to decouple things so that down the line when we support a lot more languages we won't accumulate a ton of required prerequisites, but for now it'll be easiest to have Java (and Python).

<!-- TODO: add more detail -->

To install Java, see: https://adoptium.net/temurin/releases/

<!-- TODO: add more detail -->

## `package.json` Scripts

The following scripts are available both at the repository level as well as within each individual constituent package.

Running the script within a package's workspace affects only that package, whereas running it in the repository root will make it apply to the entire repository.

### `yarn format`

Makes sure all files are properly formatted, rewriting them if necessary. Usually uses [Prettier](https://prettier.io/), but may also use other tools as necessary. (For example, the Python code in the [Adventure Pack](workspaces/adventure-pack/) is formatted using [Black](https://black.readthedocs.io/).)

### `yarn lint`

Lints files! Currently [ESLint](https://eslint.org/) is the only linter, but it would be nice to have more. Perhaps you'd like to [add another one](CONTRIBUTING.md)?

### `yarn test`

For the packages that have tests, runs those tests!

### `yarn typecheck`

Checks the type correctness of the code. Currently only TypeScript files are checked, using the TypeScript compiler. Java and Kotlin code in the [Adventure Pack](workspaces/adventure-pack/) is checked indirectly, when we attempt to compile it.
