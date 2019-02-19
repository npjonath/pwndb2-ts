import {
  description,
  program,
  requiredArg,
  usage,
  version,
} from 'commander-ts';
// @ts-ignore
import * as tr from 'tor-request';

export interface IPwnDbResult {
  domain: string;
  password: string;
  username: string;
}

@program()
@version('1.0.0')
@description(
  'Query the PwnDb2 Hidden Tor service in order to find leaked password for email or domain.'
)
@usage('--help')
export class PwnDb2 {
  constructor() {}

  public run(@requiredArg('emailOrDomain') emailOrDomain: string) {
    let queryUsername: string = '';
    let queryDomain: string = '';

    if (emailOrDomain) {
      if (emailOrDomain.indexOf('@') > -1) {
        queryUsername = emailOrDomain.split('@')[0];
        queryDomain = emailOrDomain.split('@')[1];
        if (!queryUsername) {
          queryUsername = '%';
        }
      }
      tr.request(
        'http://pwndb2am4tzkvold.onion',
        {
          method: 'POST',
          qs: {
            domain: queryDomain,
            domainopr: 1,
            luser: queryUsername,
            luseropr: 1,
            submitform: 'em',
          },
        },
        (err: any, res: any, body: any) => {
          if (!err && res.statusCode === 200) {
            const pwnResults: IPwnDbResult[] = [];

            if (body) {
              const leaks: string[] = body.toString().split('Array');
              let username: string;
              let domain: string;
              let password: string;

              for (let leak of leaks) {
                leak = leak.toLowerCase();
                try {
                  username = leak
                    .split('[luser] =>')[1]
                    .split('[')[0]
                    .trim();
                  domain = leak
                    .split('[domain] =>')[1]
                    .split('[')[0]
                    .trim();
                  password = leak
                    .split('[password] =>')[1]
                    .split(')')[0]
                    .trim();

                  if (username) {
                    pwnResults.push({
                      domain,
                      password,
                      username,
                    });
                  }
                } catch (e) {}
              }
            }

            if (pwnResults && pwnResults.length > 0) {
              console.log('You have been pwned... :(');
              console.log(pwnResults);
            } else {
              console.log('No leak found for this query... :)');
            }
          }
        }
      );
    }
  }
}

new PwnDb2();
