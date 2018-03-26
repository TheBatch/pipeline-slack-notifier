import {notifySlack} from './slackNotifier';

exports.handler = async (event, context, callback) => {
  const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
  try {
    if (event['detail-type'] != 'CodePipeline Pipeline Execution State Change') {
      throw new Error(`Unsupported event detail type: ${event['detail-type']}`);
    }
    await notifySlack(SLACK_WEBHOOK_URL, event);
    callback(null, 'Done');
  } catch (e) {
    console.log(`Got an error - ${e.message}`);
    callback('Error logged');
  }
};
