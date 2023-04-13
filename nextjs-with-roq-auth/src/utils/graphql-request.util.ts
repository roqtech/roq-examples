import { clientConfig } from '../config';

type GraphqlRequestArg<T> = {
    query: string;
    variables?: T,
    accessToken: string,
    responseKey?: string,
}
export const graphqlRequest = <T>(_: string, { arg }: { arg: GraphqlRequestArg<T> }) => {
    const { variables, query, accessToken, responseKey } = arg;
    if (!accessToken) {
        console.warn('GraphQL request was initiated without accessToken');
        return Promise.resolve(undefined);
    }
    return fetch(`${clientConfig.roq.platformURL}/v01/graphql`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'roq-platform-authorization': `Bearer ${accessToken}`
            },
            body: query ? JSON.stringify({ query, variables }) : undefined,
        })
        .then((res) => res.json())
        .then(({ data }) => responseKey ? data[responseKey] : data)
}
