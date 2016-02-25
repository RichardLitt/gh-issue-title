#!/usr/bin/env node
'use strict'

const meow = require('meow')
const ghIssueTitle = require('./')
const Promise = require('bluebird')
const gitconfig = require('gitconfiglocal')
const pify = require('pify')
const ghauth = Promise.promisify(require('ghauth'))
const authOptions = {
  configName: 'ghauth',
  note: 'Set and get a GitHub Issue title',
  userAgent: 'ghIssue',
  scope: ['repo']
}

var cli = meow([`
  Usage
    $ gh-issue-title [input]

  Examples
    $ gh-issue-title RichardLitt/gh-issue-title 31
    Bug: Make this work
    $ gh-issue-title RichardLitt/ipfs 31 'ponies and unicorns'
    New title: ponies and unicorns
`, {
  alias: {}
}])

Promise.try(() => {
  return pify(gitconfig)(process.cwd())
}).then(config => {
  if (config && config.remote && config.remote.origin && config.remote.origin.url) {
    return config.remote.origin.url.split(':')[1].split('.git')[0]
  }
}).then((res) => {
  if (res && cli.input.length === 0) {
    cli.input[0] = res
  }
  return ghauth(authOptions)
}).then((authData) => {
  return ghIssueTitle(cli.input, cli.flags, authData.token)
}).then(function (response) {
  if (!response.method) {
    console.log(response)
  } else if (response.method === 'patch') {
    console.log(`${response.description}`)
  } else if (response.method === 'get') {
    console.log(`${response.description}`)
  }
})
