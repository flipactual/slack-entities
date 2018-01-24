const REGEXES = {
  channels: '<#(C.*?)>',
  users: '<@(U.*?)>',
  groups: '<!subteam\\^(S.*?)(?:\\|@.*?)>',
  files: '<(http.*.slack.com\/files\/.*\/F.*?)>',
  links: '<(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})>',
}

Object.keys(REGEXES).forEach(key => {
  module.exports[`get${key[0].toUpperCase()}${key.slice(1)}`] = string => {
    const matches = string.match(new RegExp(REGEXES[key], 'g'))
    return matches ? matches.map(match => ({
      tag: match,
      id: match.match(REGEXES[key])[1],
    })) : []
  }
})
