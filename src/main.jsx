// @ts-nocheck
import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createServer } from 'miragejs'
import axios from 'axios'
import App from './App'
import makeServer from './server'

if (import.meta.env.PROD) {
  axios.defaults.baseURL = 'https://api.realworld.io/api'
}

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0], { params: queryKey[1] })
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 300000,
    },
  },
})

if (window.Cypress && import.meta.env.MODE === 'test') {
  const cyServer = createServer({
    routes() {
      ;['get', 'put', 'patch', 'post', 'delete'].forEach((method) => {
        this[method]('/*', (schema, request) => {
          if (typeof window['handleFromCypress'] === 'function') {
            return window['handleFromCypress'](request)
          }
          return new Response('window.handleFromCypress not defined', { status: 500 })
        })
      })
    },
  })
  cyServer.logging = false
} else if (import.meta.env.DEV) {
  makeServer({ environment: 'development' })
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} containerElement="div" />
    </QueryClientProvider>
  </React.StrictMode>
)
