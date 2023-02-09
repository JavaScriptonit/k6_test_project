import http from 'k6/http';
import { sleep, check } from 'k6';
import { getDictionariesQueries } from '../fixtures/queries/index.js';
const BASE_URL = 'https://joinbet01.com';
const dictionariesQueriesValues = Object.keys(getDictionariesQueries);

export default function () {
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
    locale: 'ru',
    'Content-Type': 'application/json',
  };

  let res = http.post(BASE_URL + '/graphql', JSON.stringify({ query: query }), {
    headers: headers,
  });
  let result = [];
  const body = res.body;
  dictionariesQueriesValues.forEach((value) => {
    result.push(body.includes(value));
  });
  let checker = (arr) => arr.every((v) => v === true);

  check(res, {
    'status was 200': (r) => r.status === 200,
    'query values verification': () => checker(result),
  });

  sleep(0.3);
}
