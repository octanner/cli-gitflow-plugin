const buildUrl = app => `/apps/${app}/builds/auto`

const removeAutoDeploy = async (akkeris, app) => {
  const url = buildUrl(app)
  try {
    await akkeris.api.delete(`${url}/github`)
    return true
  } catch {
    return false
  }
}

const configureAutoDeploy = async (akkeris, app, gitUrl, branch) => {
  const payload = {
    app,
    repo: gitUrl,
    branch,
    status_check: true,
    auto_deploy: true,
    username: null,
    token: null
  }

  const url = buildUrl(app)
  try {
    await akkeris.api.post(JSON.stringify(payload), url)
    return true
  } catch {
    return false
  }
}

module.exports = {
  removeAutoDeploy,
  configureAutoDeploy
}
