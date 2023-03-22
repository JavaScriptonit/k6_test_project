/*
This is a k6 test script that imports the xk6-kafka and
list topics on all Kafka partitions and creates a topic.
*/

import { check } from "k6";
import { Connection } from "k6/x/kafka"; // import kafka extension

const address = "localhost:9092";
// const randomNumber = Math.floor(Math.random() * 1000);
// const topic = "xk6_kafka_test_topic" + `${randomNumber}`;
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
        // Delete the topic
        connection.deleteTopic(topic);
    }
    const results2 = connection.listTopics();

    check(results2, {
        "Topic is deleted": (topics) => !topics.includes(topic),
    });
    connection.close();
}