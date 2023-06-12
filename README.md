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

In case you're curious what *my* .zprofile looks like:
```
current_hour=$(date +%H)

if ((current_hour >= 2 && current_hour < 5 )); then
    echo "Ethan, venture into the depths of the pre-dawn hours with caution, for the productivity that dwells within holds a power both intoxicating and perilous. It is a path reserved for the bold, the restless, and the mad."
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
