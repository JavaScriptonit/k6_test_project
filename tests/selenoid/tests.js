import http from 'k6/http';
import { check, sleep } from 'k6';
// import { parseHTML } from 'k6/html';

// export let options = {
//     vus: 10,
//     duration: '10s',
// };

export default function() {
    let response = http.get('http://localhost:4444/status');
    // console.log(response);
    check(response, {
        'Selenoid - status. is status 200': (r) => r.status === 200
    });
    sleep(1);

    response = http.get('http://localhost:4444/status/logs');
    // console.log(response);
    check(response, {
        'Selenoid - logs. is status 200': (r) => r.status === 200
    });
    sleep(1);

    response = http.get('http://localhost:4444/status/video');
    // console.log(response);
    check(response, {
        'Selenoid - video. is status 200': (r) => r.status === 200
    });
    sleep(1);

    response = http.post('http://localhost:4444/session',
        `{
    "desiredCapabilities": {
      "browserName": "chrome",
      "version": "latest",
      "platform": "WINDOWS"
    }
  }`,
        { headers: { 'Content-Type': 'application/json' }});
    // console.log(response);
    check(response, {
        'Selenoid - session. is status 200': (r) => r.status === 200
    });
    sleep(1);

    // const session = JSON.parse(response.body).value;
    // console.log(session);
    // const sessionId = session.split('/').reverse()[0];
    // console.log(sessionId);
    //
    // response = http.delete(`http://localhost:4444/session/${sessionId}`);
    // check(response, {
    //     'sessionId. is status 200': (r) => r.status === 200
    // });
    // sleep(1);

    // const bodyText = 'Sessions';
    response = http.get('http://localhost:8080/');
    // console.log(response);
    check(response, {
        'Selenoid-ui - stats. is status 200': (r) => r.status === 200,
        // 'Selenoid-ui - stats. text verification': (r) => r.body.includes(bodyText),
    });
    sleep(1);

    // const capabilitiesBodyText = 'capabilities';
    response = http.get('http://localhost:8080/#/capabilities/');
    // console.log(response);
    check(response, {
        'Selenoid-ui - capabilities. is status 200': (r) => r.status === 200,
        // 'Selenoid-ui - capabilities. text verification': (r) => r.body.includes(capabilitiesBodyText),
    });
    sleep(1);

    // const videosBodyText = 'browsers';
    response = http.get('http://localhost:8080/#/videos');
    // console.log(response);
    check(response, {
        'Selenoid-ui - videos. is status 200': (r) => r.status === 200,
        // 'Selenoid-ui - videos. text verification': (r) => r.find('[title="browsers.json"]').text() === videosBodyText,
    });
    sleep(1);
}