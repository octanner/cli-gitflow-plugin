# Akkeris plugin to ease Gitflow release & deployment

## Requirements

- Does have not a branch named 'release'

## Usage

- install `aka plugins:install gitflow`
- set github access token `aka gitflow:set-token {token}`
  - must have write:packages access (https://github.com/settings/tokens)
  - enable SSO for token
- deploy `aka gitflow:deploy`
  - use `aka gitflow:deploy --help` for additional info

### Typical Use:

Creates branch called `release/foobar` off of `dev` branch for app `ccap` and deploys to `ccap-core-dev` & creates PR into `master`
Note: if the app `ccap-core-dev` does not currently have a auto-deploy configured you must specify the repo `--repo`

```bash
aka gitflow:deploy --app 'ccap-core-dev' --branch 'foobar'
```

Note: you may also use the `--base -e` option to change which branch to create `release/foobar` from.

Creates branch called `release/foobar` off of `feature/this` branch for app `ccap` and deploys to `ccap-core-dev` & creates PR into `master`

Note: this will not create a PR into `dev`

```bash
aka gitflow:deploy --app 'ccap-core-dev' --branch 'foobar' --base 'feature/this'
```

### Hotfix Use:

Uses existing branch called `hotfix/some-fix` to deploy to `ccap-core-dev` & creates PR into `master`

```bash
aka gitflow:deploy --app 'ccap-core-dev' --branch 'hotfix/some-fix'
```

### Commit Use:

Creates branch called `release/foobar` off of commit `{commitSha}` for app `ccap` and deploys to `ccap-core-dev` & creates PR into `master`

```bash
aka gitflow:deploy --app 'ccap-core-dev' --branch 'foobar' --sha '{commitSha}'
```

## Development

- clone
- install `npm i`
- update version in package.json than install `npm i`
- symlink local repo to akkeris directory (optional)
  - remove akkeris plugin directory `rm -rf ~/.akkeris/plugins/gitflow`
  - rename working directory to `gitflow`
  - symlink working directory to akkeris plugin directory `ln -s ~/path/to/gitflow/working/directory ~/.akkeris/plugins/gitflow`
