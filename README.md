# Akkeris plugin to ease Gitflow release & deployment

## Requirements

- Akkeris app must have 'qa' space and must end in 'qa'.
- Does have not a branch named 'release'

## Usage

- install `aka plugins:install gitflow`
- set github access token `aka gitflow:set-token {token}`
  - must have repo:write access (https://github.com/settings/tokens)
  - enable SSO for token
- deploy `aka gitflow:deploy`
  - use `aka gitflow:deploy --help` for additional info

Note: `ccap*qa` refers to an app called `ccpa` that has a space called `qa` such that the whole app name begins with `ccap` and ends with `qa`.

### Typical Use:

Creates branch called `release/foobar` off of `dev` branch for app `ccap` and deploys to `ccap*qa` & creates PR into `master`
Note: if the app `ccap*qa` does not currently have a auto-deploy configured you must specify the repo `--repo`

```bash
aka gitflow:deploy --app ccap --branch foobar
```

Note: you may also use the `--base -e` option to change which branch to create `release/foobar` from.

Creates branch called `release/foobar` off of `feature/this` branch for app `ccap` and deploys to `ccap*qa` & creates PR into `master`

Note: this will not create a PR into `dev`

```bash
aka gitflow:deploy --ap ccap --branch foobar --base 'feature/this' 
```

### Hotfix Use:

Uses existing branch called `hotfix/some-fix` to deploy to `ccap*qa` & creates PR into `master`

```bash
aka gitflow:deploy --app ccap --branch 'hotfix/some-fix'
```

### Commit Use:

## Development

- clone
- install `npm i`
- update version in package.json than install `npm i`
- symlink local repo to akkeris directory (optional)
  - remove akkeris plugin directory `rm -rf ~/.akkeris/plugins/gitflow`
  - rename working directory to `gitflow`
  - symlink working directory to akkeris plugin directory `ln -s ~/path/to/gitflow/working/directory ~/.akkeris/plugins/gitflow`
