## A modern load testing tool, using Go and JavaScript - https://k6.io

### Commands to RUN tests:
* `k6 run --http-debug debugJoinbet.js` - execute a 20s total smoke test (main page request)
  * `k6 run debugJoinbet.js` - no debug mode
* `k6 run --http-debug graphqlJoinbet.js` - execute a 1s graphql test (getDictionaries query)
  * `k6 run graphqlJoinbet.js` - no debug mode
* `k6 run --http-debug graphqlGitHub.js` - execute a 1s graphql test (FindFirstIssue query), need to add accessToken to work
  * `k6 run graphqlGitHub.js` - no debug mode


### Help commands:
* `npx prettier --write .` - project prettier run
* `nvm use v16.13.2` - use node v16.13.2 (npm v8.1.2)
* `brew install k6` - install k6