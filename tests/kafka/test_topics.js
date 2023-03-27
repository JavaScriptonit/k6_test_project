import { check } from "k6";
import { Connection } from "k6/x/kafka";

const address = "localhost:9092";
const topic = "xk6_kafka_test_topic";

const connection = new Connection({
    address: address,
});

const results = connection.listTopics();
connection.createTopic({ topic: topic });

export default function () {
    results.forEach((topic) => console.log(topic));

    check(results, {
        "Topic is created": (topics) => topics.includes(topic),
    });
}

export function teardown(data) {
    if (__VU == 0) {
        connection.deleteTopic(topic);
    }
    const results2 = connection.listTopics();

    check(results2, {
        "Topic is deleted": (topics) => !topics.includes(topic),
    });
    connection.close();
}