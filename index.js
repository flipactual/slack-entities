const REGEXES = {
  channels: '<#(C.*?)>',
  users: '<@(U.*?)>',
  groups: '<!subteam\\^(S.*?)(?:\\|@.*?)>',
  files: '<(http.*.slack.com\/files\/.*\/F.*?)>',
  // @see https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
  links: '<((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-]*)?\\??(?:[\\-\\+=&;%@\\.\\w]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)>',

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
