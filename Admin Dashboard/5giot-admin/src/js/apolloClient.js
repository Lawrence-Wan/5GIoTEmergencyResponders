import { InMemoryCache } from "apollo-cache-inmemory";
import { getTokens, saveTokens } from "./manageTokens";
import ApolloClient from "apollo-boost";

let apolloClient = null;
function createClient() {
  return new ApolloClient({
    uri: "http://localhost:9000/graphql",
    fetch: async (uri, options) => {
      const initialRequest = await fetch(uri, options);
      const { headers } = initialRequest;
      const accessToken = headers.get("x-access-token");
      const refreshToken = headers.get("x-refresh-token");
      if (accessToken && refreshToken) {
        saveTokens({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
      return initialRequest;
    },
    request: (operation) => {
      const tokens = getTokens();
      // console.log("TOKENS" + tokens);
      if (tokens && tokens.accessToken) {
        operation.setContext({
          headers: {
            "x-access-token": tokens.accessToken,
            "x-refresh-token": tokens.refreshToken,
          },
        });
      }
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[5gIoT - GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        console.log(`[5gIoT - Network error]: ${networkError}`);
        // return <NetworkError />;
      }
    },
    cache: new InMemoryCache(),
  });
}

export function getApolloClient() {
  const _apolloClient = apolloClient ? apolloClient : createClient();
  if (!apolloClient) apolloClient = _apolloClient;
  return apolloClient;
}
