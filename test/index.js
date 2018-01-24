const assert = require('assert')

const slackEntities = require('../')
const getChannels = slackEntities.getChannels
const getUsers = slackEntities.getUsers
const getGroups = slackEntities.getGroups
const getFiles = slackEntities.getFiles
const getLinks = slackEntities.getLinks

const user = {
  tag: '<@USLACKBOT>',
  id: 'USLACKBOT',
}
const channel = {
  tag: '<#C0000000>',
  id: 'C0000000',
}
const group = {
  tag: '<!subteam^S0000000|@besties>',
  id: 'S0000000',
}
const html = '<HTML/>'
const internalFile = 'https://austinprivatelibrary.slack.com/files/flip/F00000000/README.md'
const externalLink = 'https://get.slack.help/hc/en-us/articles/204399343-Sharing-links-in-Slack'
const httpsLinkWithQuery = 'https://www.google.com/?url=has-querystring'

const toTag = str => '<' + str + '>'
const toLink = str => ({
  id: str,
  tag: toTag(str),
})

describe('getChannels', () => {
  it('extracts tags for channels', () => {
    assert.deepEqual(getChannels(`hey ${user.tag} check out ${channel.tag}`), [
      channel,
    ])
  })
})
describe('getUsers', () => {
  it('extracts tags for users', () => {
    assert.deepEqual(getUsers(`i bet ${user.tag} knows ${html}`), [
      user,
    ])
  })
})
describe('getGroups', () => {
  it('extracts tags for groups of users', () => {
    assert.deepEqual(getGroups(`lylas ${group.tag}`), [
      group,
    ])
  })
})
describe('getFiles', () => {
  it('extracts tags for internal files, snippets, and posts', () => {
    assert.deepEqual(getFiles(`${toTag(internalFile)} and ${toTag(externalLink)}`), [
      toLink(internalFile),
    ])
  })
})

// TODO emails 'mailto:somebody@google.com' => '<mailto:somebody@google.com|somebody@google.com>'
// @see http://jsbin.com/eqocuh/5/edit?html,js,output
describe('getLinks', () => {
  it('extracts tags for links', () => {
    assert.deepEqual(getLinks(`${toTag(internalFile)}`), [
      toLink(internalFile),
    ])
    assert.deepEqual(getLinks(`Have this query string ${toTag(httpsLinkWithQuery)}`), [
      toLink(httpsLinkWithQuery),
    ])
  })
})
