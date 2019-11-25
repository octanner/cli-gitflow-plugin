# Akkeris plugin to ease Gitflow release & deployment

## Usage
  - install `aka plugins:install gitflow`
  - set github access token `aka gitflow:set-token {token}`
    - must have repo:write access
  - deploy `aka gitflow:deploy`
    - use `aka gitflow:deploy --help` for additional info


## Development
  - clone
  - install `npm i`
  - update version in package.json than install `npm i`
  - symlink local repo to akkeris directory (optional)
    - remove akkeris plugin directory `rm -rf ~/.akkeris/plugins/gitflow`
    - rename working directory to `gitflow`
    - symlink working directory to akkeris plugin directory `ln -s ~/path/to/gitflow/working/directory ~/.akkeris/plugins/gitflow`
