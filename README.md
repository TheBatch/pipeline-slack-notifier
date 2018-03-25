# pipeline-slack-notifier
The project uses the serverless framework to set up an AWS Lambda function which is invoked by an `CodePipeline Pipeline Execution State Change` Event fired when an AWS CodePipeline's state changes. The event's payload is parsed and pushed to Slack. Thus, pipeline starts, successes and failures are easily and right away visible in Slack.

## Deployment
To deploy the solution an environment variable called `SLACK_URL` needs to be set to your Slack webhook. It looks like this `https://hooks.slack.com/services/1D6AEB699/F4A39D451/jUCfsmDh8l60lMjpamcxQF9b`. Use it in the following command

```bash
export SLACK_URL="https://hooks.slack.com/services/1D6AEB699/F4A39D451/jUCfsmDh8l60lMjpamcxQF9b" && npm run deploy:prod
```

## Tests
The code ships with some tests to check whether the incoming CloudWatch Event is mapped properly to the Slack API. Run them with this command.

```bash
npm run test
```