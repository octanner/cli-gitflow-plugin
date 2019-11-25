const nrc = require('netrc')
const netrc = nrc()

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
const getGithubAccessToken = () => netrc['github.com'].accessToken
const setGithubAccessToken = token => {
  const github = netrc['github.com']
  netrc['github.com'] = {
    ...(github ? github : {}),
    accessToken: token
  }
  nrc.save(netrc)
}

module.exports = {
  timeout,
  getGithubAccessToken,
  setGithubAccessToken
}
