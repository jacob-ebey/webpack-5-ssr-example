import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'

function createApolloClient () {
  const cache = new InMemoryCache()

  if (typeof window !== 'undefined') {
    cache.restore(window.__APOLLO_STATE__)
  }

  return new ApolloClient({
    cache,
    link: new HttpLink({
      fetch,
      uri: 'https://swapi-graphql.netlify.com/.netlify/functions/index'
    })
  })
}

export default createApolloClient
