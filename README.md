# BrainJS Trainer Template

A template project for training neural networks and hosting the result to github pages

Copy this template to start development of your own `brain.js` neural network.

Template features include:
- Train command `node train` - train your network, based on test data (inputs:outputs)
- Parse command `node parse` - test your network our, give it test input, see the output
- Hosted website - interactively play with the network via a web browser, either locally, or hosted via Github Pages

Visit the [github hosted website](https://connected-web.github.io/brainjs-trainer-template/) for an interactive demo.

If this is a new repo created from the template; please go to the repo Settings page, and configure Pages to deploy from the `gh-pages` branch.

## Project Goals

- Create a template that makes it easy to plan and build new neural networks
- Make it easy to host the website via Github Pages to share creations with the world
- Help a broader audience learn about, and train, using neural networks

## Implemented Features

- 💽 Training function - Produce a model from training data
- 🧠 CLI parsing - Rehydrate the network, and run a string through the network to generate an output
- 🌍 Web hosted version - Run the network interactively through a web browser (Vue + Vite, hosted on Github Pages)
- 🏷️ Basic dictionary tokenisation - A structured way to break complex inputs down into meaningful values to drive the network
- 📦 Expanded outputs - take high-cardinality data, and map it onto network outputs

### Ideal outputs

Document here what you want the output of your network to be:

```js
{
  input: 'reddish',
  output: {
    red: 1.0,
    blue: 0.1,
    green: 0.4
  }
}
```

## Local setup

Prerequisites:
- `NodeJS LTS >= 16`, and latest version of `npm`
- `Python 2.7`
  - e.g.: on Ubuntu `sudo apt-get install -y python`
  - e.g.: on Mac `brew install pyenv`, `pyenv install 2.7.18`
- Brain.js [system dependencies](https://github.com/BrainJS/brain.js#system-dependencies)
  - e.g.: on Ubuntu `sudo apt-get install -y python build-essential libxi-dev libglu1-mesa-dev libglew-dev pkg-config`

Clone the project to your local machine, then from the project folder run:
```
npm install
```

The install might be quite slow at the point where it says:
```
reify:webgpu slow install npm
```

Just be patient...

## Training

To train the network, run:
```
npm run train
```

To test the network against existing dataset, run:
```
npm run test
```

To test against a single input string, run:
```
node trainer/parse "red"
```

## Libraries

- `brain.js`