const Octokit = require('@octokit/rest')
const { getGithubAccessToken } = require('./utils')
const octokit = new Octokit({
  auth: getGithubAccessToken()
})

const owner = 'octanner'
const createBranch = async (repo, branchName, sha) => {
  try {
    const res = await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha
    })
    return res.data
  } catch {}
}

const getBranch = async (repo, branchName) => {
  try {
    const res = await octokit.repos.getBranch({
      owner,
      repo,
      branch: branchName
    })
    return res.data
  } catch {}
}

const createPullRequest = async (repo, title, head, base) => {
  try {
    const res = await octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base
    })
    return res.data
  } catch {}
}

const getBranchToMerge = async (repo, branchName, sha, base) => {
  try {
    // check if we need to create release branch
    const existingBranch = await getBranch(repo, branchName)
    if (existingBranch) return existingBranch

    const releaseBranchName = `release/${branchName}`

    // if sha exists create branch from it
    if (sha) {
      const newBr = await createBranch(repo, releaseBranchName, sha)
      return {
        ...newBr,
        name: releaseBranchName
      }
    }

    // lastly use base or 'dev' to create release branch
    const baseBranchName = base || 'dev'
    const baseBranch = await getBranch(repo, baseBranchName)
    if (!baseBranch) return null

    const newBranch = await createBranch(
      repo,
      releaseBranchName,
      baseBranch.commit.sha
    )
    return {
      ...newBranch,
      name: releaseBranchName
    }
  } catch {
    return null
  }
}

module.exports = {
  createBranch,
  getBranch,
  createPullRequest,
  getBranchToMerge
}
