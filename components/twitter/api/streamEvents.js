const needle = require('needle');

const bearerToken = process.env.BEARER_TOKEN;

const streamURL = 'https://api.twitter.com/2/tweets/search/stream';

function streamConnect() {
    const stream = needle.get(streamURL, {
    headers: {
      "User-Agent": "v2SampleStreamJS",
      "Authorization": `Bearer ${token}`
    },
    timeout: 20000
    });

    stream.on('data', data => {
        try {
            const json = JSON.parse(data);
            console.log(json);
        } catch (e) {
          // Keep alive signal received. Do nothing.
        }
    }).on('error', error => {
      if (error.code === 'ETIMEDOUT') {
        stream.emit('timeout');
      }
    });

    return stream;
}

(async () => {

    // Listen to the stream.
    // This reconnection logic will attempt to reconnect when a disconnection is detected.
    // To avoid rate limits, this logic implements exponential backoff, so the wait time
    // will increase if the client cannot reconnect to the stream.

    const sampledStream = streamConnect();
    let timeout = 0;
    sampledStream.on('timeout', () => {
    // Reconnect on error
    console.warn('A connection error occurred. Reconnecting…');
    setTimeout(() => {
      timeout++;
      streamConnect();
    }, 2 ** timeout);
        streamConnect();
    })

})();
