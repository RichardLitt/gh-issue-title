'use strict'

const Octokat = require('octokat')
const Promise = require('bluebird')
var octo

module.exports = function (args, flags, token) {
  // if (typeof args !== 'string') {
  //   throw new TypeError('Expected a string')
  // }
  // if (repoName.split('/').length !== 2) {
  //   throw new Error('Not a repository name in form \'user/repo\'')
  // }
  var title = args[2]
  var repoName = args[0].split('/')
  var issueNo = repoName[3] || args[1]

  console.log(args, repoName)

  return Promise.resolve().then(() => {
    octo = new Octokat({
      token: token || process.env.GITHUB_OGN_TOKEN
    })
    return args
  }).then((args) => {
    return octo.repos(repoName[0], repoName[1]).issues(issueNo).fetch()
  }).then(function (result) {
    console.log('result', result)
    if (title) {
      // return Promise.try(() => {
      //   console.log('URL', repoName[0], repoName[1], result.number, title)
      //   return octo.repos(repoName[0], repoName[1]).issues(result.number).update({
      //     'title': title
      //   })
      // }).then((result) => {
      //   return { method: 'patch', description: result.title }
      // }).catch((err) => {
      //   console.log(err)
      //   throw ('Unable to set title', err)
      // })
    } else {
      return { method: 'get', description: result.title }
    }
  }).catch(function (err) {
    if (err.status === 404) {
      return err
    } else {
      throw ('Could not get GitHub user', err)
    }
  })
}
