import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    // stages: [
    //     { duration: '30s', target: 20 },
    //     { duration: '1m30s', target: 10 },
    //     { duration: '20s', target: 0 },
    // ],
    vus: 100,
    duration: '10s',
};

const recentWinsText = 'Последние выигрыши';
const BASE_URL = 'https://joinbet01.com';

export default function () {
    const res = http.get(BASE_URL + '/ru/casino/lobby');
    check(res, {
        'status was 200': (r) => r.status === 200,
        'text verification': (r) => r.body.includes(recentWinsText)
    });
    sleep(1);
}