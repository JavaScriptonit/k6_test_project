import http from "k6/http";
import { sleep, check } from "k6";
const BASE_URL = 'https://joinbet01.com';

export default function() {

    let query = `
        query getDictionaries {
          currencies {
            __typename
            ... on DictionaryCurrencyList {
              list {
                ID
                Name
                fullName
                gallery {
                  defaultView {
                    backgroundClickUrl
                    backgroundImageUrl
                    html
                  }
                }
              }
            }
            ... on ValidationError {
              result
              errors {
                message
                status
                field
              }
            }
          }
          countries {
            __typename
            ... on CountryList {
              list {
                gallery {
                  defaultView {
                    backgroundClickUrl
                    backgroundImageUrl
                    html
                  }
                }
                id
                maskPhone
                maxNumber
                minNumber
                phoneCode
                currency
                title
                value
              }
            }
            ... on ValidationError {
              result
              errors {
                message
                status
                field
              }
            }
          }
          registrationBonuses {
            __typename
            ... on RegistrationBonusList {
              list {
                ID
                Name
                forRegistrationName
                gallery {
                  registrationViewImage {
                    backgroundClickUrl
                    backgroundImageUrl
                    html
                  }
                }
              }
            }
            ... on ValidationError {
              result
              errors {
                message
                status
                field
              }
            }
          }
        }`;

    let headers = {
        "locale": "ru",
        "Content-Type": "application/json"
    };

    let res = http.post(BASE_URL + "/graphql",
        JSON.stringify({ query: query }),
        {headers: headers}
    );

    check(res, {
        'status was 200': (r) => r.status === 200,
    });

    if (res.status === 200) {
        console.log(JSON.stringify(res.body));
        let body = JSON.parse(res.body);
        // let issue = body.data.repository.issues.edges[0].node;
        // console.log(issue.id, issue.number, issue.title);
    }
    sleep(0.3);
}