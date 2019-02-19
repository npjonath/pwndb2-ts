import { description, program, requiredArg, usage, version } from "commander-ts";
// @ts-ignore
import * as tr from "tor-request";

export interface IPwnDbResult {
  domain: string;
  password: string;
  username: string;
}

@program()
@version("1.0.0")
@description(
  "Query the PwnDb2 Hidden Tor service in order to find leaked password for email or domain."
)
@usage("--help")
export class PwnDb2 {
  constructor() {
  }

  public run(@requiredArg("emailOrDomain") emailOrDomain: string) {
    const pwnResults: IPwnDbResult[] = [];

    let queryUsername: string = "";
    let queryDomain: string = "";

    if (emailOrDomain) {
      // Filtering Inputs
      if (emailOrDomain.indexOf("@") > -1) {
        queryUsername = emailOrDomain.split("@")[0]
          ? emailOrDomain.split("@")[0]
          : "%";
        queryDomain = emailOrDomain.split("@")[1];
      }

      // Query Tor Hidden Service
      tr.request(
        "http://pwndb2am4tzkvold.onion",
        {
          method: "POST",
          qs: {
            domain: queryDomain,
            domainopr: 1,
            luser: queryUsername,
            luseropr: 1,
            submitform: "em"
          }
        },
        (err: any, res: any, body: any) => {
          if (!err && res.statusCode === 200) {
            if (body) {
              // Parse HTML response
              const leaks: string[] = body.toString().split("Array");

              for (let leak of leaks) {
                try {
                  let username: string;
                  let domain: string;
                  let password: string;
                  leak = leak.toLowerCase();
                  username = leak
                    .split("[luser] =>")[1]
                    .split("[")[0]
                    .trim();
                  domain = leak
                    .split("[domain] =>")[1]
                    .split("[")[0]
                    .trim();
                  password = leak
                    .split("[password] =>")[1]
                    .split(")")[0]
                    .trim();

                  if (username) {
                    pwnResults.push({
                      domain,
                      password,
                      username
                    });
                  }
                } catch (e) {
                }
              }
            }
          }

          // Forge Response
          const response = {
            count: pwnResults.length,
            input: {
              domain: queryDomain,
              username: queryUsername
            },
            message:
              pwnResults.length > 0
                ? "You have been pwned... :("
                : "No leak found for this query... :)",
            status: {
              code: res.statusCode,
              error: err ? err : ""
            }
          };

          // Output in console
          console.log(JSON.stringify(response));
        }
      );
    }
  }
}

new PwnDb2();
