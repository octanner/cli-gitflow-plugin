const deployArgs = require('./src/arguments')
const {
  getGithubAccessToken,
  setGithubAccessToken,
  timeout
} = require('./src/utils')
const {
  getBranch,
  getBranchToMerge,
  createPullRequest
} = require('./src/git-utils')
const { configureAutoDeploy, removeAutoDeploy } = require('./src/akkeris-utils')

const verifyAccessToken = () => Boolean(getGithubAccessToken())

async function deploy (akkeris, args) {
  let task = akkeris.terminal.task(`Verifying access token.`)
  task.start()

  if (!verifyAccessToken()) {
    task.end('error')
    console.log(
      "Please set your Github access token using 'gitflow:set-token'."
    )
    return
  }
  task.end('ok')

  task = akkeris.terminal.task(`Retrieving apps for ${args.app}.`)
  task.start()
  // get qa app
  const allApps = await akkeris.api.get('/apps')
  const app = allApps.find(a => a.name === args.app)
  if (!app) return task.end('error')
  task.end('ok')

  task = akkeris.terminal.task(`Retrieving gitUrl.`)
  task.start()
  // pull repo from git url
  const gitUrl = args.repo || app.git_url
  if (!gitUrl) return task.end('error')
  const repo = gitUrl.substring(gitUrl.lastIndexOf('/') + 1)
  task.end('ok')

  task = akkeris.terminal.task(
    `Creating or retrieving release branch: ${args.branch}.`
  )
  task.start()
  // get branch to merge
  const mergeBranch = await getBranchToMerge(
    repo,
    args.branch,
    args.sha,
    args.base
  )
  if (!mergeBranch) return task.end('error')
  task.end('ok')

  task = akkeris.terminal.task(`Retrieving master branch.`)
  task.start()
  // create PR
  const masterBranch = await getBranch(repo, 'master')
  if (!masterBranch) return task.end('error')
  task.end('ok')

  task = akkeris.terminal.task(`Creating PR.`)
  task.start()
  const title = `Merge ${mergeBranch.name} into ${masterBranch.name}`
  const pr = await createPullRequest(
    repo,
    title,
    mergeBranch.name,
    masterBranch.name
  )
  if (!pr) return task.end('error')
  task.end('ok')

  if (app.git_url) {
    task = akkeris.terminal.task(`Removing auto-deploy.`)
    task.start()
    const removed = removeAutoDeploy(akkeris, app.name)
    if (!removed) return task.end('error')

    // when removing we need to give it more time so it completes
    await timeout(4000)
    task.end('ok')
  }

  task = akkeris.terminal.task(
    `Setting up auto-deploy for ${mergeBranch.name}.`
  )
  task.start()
  if (app.git_url) await timeout(4000)

  const configured = configureAutoDeploy(
    akkeris,
    app.name,
    gitUrl,
    mergeBranch.name
  )
  if (!configured) return task.end('error')
  return task.end('ok')
}

function setToken (akkeris, args) {
  const task = akkeris.terminal.task(`Setting github access token.`)
  task.start()
  setGithubAccessToken(args.TOKEN)
  task.end('ok')
}

function init (akkeris) {
  akkeris.args.command(
    'gitflow:deploy',
    'This creates a release branch and deploys to qa.',
    {
      app: deployArgs.app,
      base: deployArgs.base,
      branch: deployArgs.branch,
      sha: deployArgs.sha,
      repo: deployArgs.repo
    },
    deploy.bind(null, akkeris)
  )
  akkeris.args.command(
    'gitflow:set-token TOKEN',
    'This sets the github access token.',
    {},
    setToken.bind(null, akkeris)
  )
}

module.exports = {
  init,
  group: 'gitflow',
  help: 'Plugin to help ease branching, deploying, & creating PRs.',
  primary: false
}
