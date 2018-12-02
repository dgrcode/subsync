const showError = (header, ...rest) => {
  console.log('\x1b[1m\x1b[91m%s\x1b[0m', header)
  console.log(rest.join('\n'))
}

module.exports = showError
