# alfred-mattermost [![Build Status](https://travis-ci.org/jasonnutter/alfred-mattermost.svg?branch=master)](https://travis-ci.org/jasonnutter/alfred-mattermost)

> Alfred workflow for Mattermost chat servers


## Install

```
$ npm install --global alfred-mattermost
```

*Requires [Node.js](https://nodejs.org) 4+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*


## Usage

**Note**: This workflow is currently optimized to work with Google Chrome, and will keep reusing the same Chrome tab if one is open. If you don't use Google Chrome, you can manually edit the workflow so that the `mm` command triggers the "Open URL" action, instead of the Apple Script action.

### Set Domain

Provide the domain for your Mattermost server, e.g. `https://chat.example.com`.

Command: `mm_domain https://chat.example.com`

### Set Personal Access Token

Provide the personal access token to use to make API requests.

Command: `mm_token <token>`

### Open channel / user thread

Provide the name of the channel or user you want to open.

Command: `mm query`


## License

MIT © [Jason Nutter](https://github.com/jasonnutter/alfred-newrelic)
