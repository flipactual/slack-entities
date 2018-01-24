# slack-entities

Methods for extracting entities like channels and users from Slack messages.

## Example:

```js
const slackEntities = require('../')
const getChannels = slackEntities.getChannels
const getUsers = slackEntities.getUsers
const getGroups = slackEntities.getGroups
const getFiles = slackEntities.getFiles
const getLinks = slackEntities.getLinks

getChannels('hey <@USLACKBOT> check out <#C0000000>')
// [{
//   tag: '<#C0000000>',
//   id: 'C0000000'
// }]
getUsers('i bet <@USLACKBOT> knows <HTML/>')
// [{
//   tag: '<@USLACKBOT>',
//   id: 'USLACKBOT'
// }]
getGroups('lylas <!subteam^S0000000|@besties>')
// [{
//   tag: '<!subteam^S0000000|@besties>',
//   id: 'S0000000'
// }]
getFiles('check out <https://austinprivatelibrary.slack.com/files/flip/F00000000/README.md> and <https://get.slack.help/hc/en-us/articles/204399343-Sharing-links-in-Slack>')
// [{
//   tag: '<https://austinprivatelibrary.slack.com/files/flip/F00000000/README.md>',
//   id: 'https://austinprivatelibrary.slack.com/files/flip/F00000000/README.md',
// }]
getLinks('Have this query string <https://www.google.com/?url=has-querystring> is quite nice.')
// [{
//   tag: '<https://www.google.com/?url=has-querystring>',
//     id: 'https://www.google.com/?url=has-querystring' 
// }]
```
