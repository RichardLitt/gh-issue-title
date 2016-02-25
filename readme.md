# gh-issue-title [![Build Status](https://travis-ci.org/RichardLitt/gh-issue-title.svg?branch=master)](https://travis-ci.org/RichardLitt/gh-issue-title)

> Get and set a GitHub Issue title

**Note:** This is a work in progress.

## Install

```
$ npm install --save gh-issue-title
```


## Usage

```js
const ghIssueTitle = require('gh-issue-title');

ghIssueTitle('unicorns');
//=> 'unicorns & rainbows'
```


## API

### ghIssueTitle(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global gh-issue-title
```

```
$ gh-issue-title --help

  Usage
    gh-issue-title [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ gh-issue-title
    unicorns & rainbows
    $ gh-issue-title ponies
    ponies & rainbows
```


## License

MIT © [Richard Littauer](http://burntfen.com)
