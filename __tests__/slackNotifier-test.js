import {mapEventToSlackPayload} from '../slackNotifier';


const e = {
  'version': '0',
  'id': '77ebc26f-7b8a-4df6-bca7-bfabee67810e',
  'detail-type': 'CodePipeline Pipeline Execution State Change',
  'source': 'aws.codepipeline',
  'account': '111111111111',
  'time': 'TimeStamp',
  'region': 'us-east-1',
  'resources': [
    'arn:aws:codepipeline:us-east-1:111111111111:myPipeline',
  ],
  'detail': {
    'pipeline': 'myPipeline',
    'version': '1',
    'state': 'FAILED',
    'execution-id': 'fdc8cccf-0d10-4321-b67f-697a9b41e2ea',
  },
};

describe('Slack Notifier', () => {
  it('should map the start event\'s data to the proper Slack API payload', () => {
    e.detail.state = 'STARTED';
    const p = mapEventToSlackPayload(e);
    expect(p.icon_emoji).toBe(':arrows_counterclockwise:');
    expect(p.attachments[0].text).toContain('started');
  });

  it('should map the success event\'s data to the proper Slack API payload', () => {
    e.detail.state = 'SUCCEEDED';
    const p = mapEventToSlackPayload(e);
    expect(p.icon_emoji).toBe(':100:');
    expect(p.attachments[0].text).toContain('succeeded');
  });

  it('should map the failure event\'s data to the proper Slack API payload', () => {
    e.detail.state = 'FAILED';
    const p = mapEventToSlackPayload(e);
    expect(p.icon_emoji).toBe(':fire:');
    expect(p.attachments[0].text).toContain('failed');
  });
});
