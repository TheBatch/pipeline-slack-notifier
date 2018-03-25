import fetch from 'node-fetch';

const notifySlack = async (slackWebHookUrl, eventData) => {
  const payload = mapEventToSlackPayload(eventData);
  return postMessage(slackWebHookUrl, payload);
};

const postMessage = async (targetUrl, payload) => {
  return fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

const mapEventToSlackPayload = (event) => {
  let color = '#9EBFED';
  let text = `${event.detail.pipeline} has `;
  let icon = ':arrows_counterclockwise:';

  const currentState = event.detail.state;

  if (currentState == 'STARTED') {
    text += 'started.';
  } else if (currentState == 'SUCCEEDED') {
    color = 'good';
    icon = ':100:';
    text += '*succeeded*.';
  } else if (currentState == 'FAILED') {
    color = 'danger';
    icon = ':fire:';
    text += '*failed*!';
  } else {
    color = 'warning';
    icon = ':warning:';
    text += `has entered an unmapped state! - *${currentState}`;
  }

  const payload = {
    icon_emoji: icon,
    username: `DeploymentNotifier - ${event.region}`,
    attachments: [
      {
        text: text,
        fallback: text,
        color: color,
      },
    ],
  };

  return payload;
};

export { notifySlack, mapEventToSlackPayload };
