module.exports = {
  app: {
    alias: 'a',
    string: true,
    demand: true,
    description: "The app to deploy. Full name (Example: 'adminui-core-qa')"
  },
  branch: {
    alias: 'b',
    string: true,
    demand: true,
    description:
      'The name of the release branch.  If this is an existing branch no new branch will be created, sha and base args will be ignored.'
  },
  sha: {
    alias: 's',
    string: true,
    demand: false,
    description: 'The sha to create the release branch from.'
  },
  base: {
    alias: 'e',
    string: true,
    demand: false,
    description: 'The branch to create the release branch from. (Default: dev])'
  },
  repo: {
    alias: 'r',
    string: true,
    demand: false,
    description:
      "Github repo url. (Example: 'https://github.com/octanner/core-admin-ui/')."
  }
}
