import { StrictMode, Suspense, useLayoutEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import routes from '~react-pages'

function Meature(props: any) {
  const start = performance.now()

  useLayoutEffect(() => {
    console.log(props, performance.now() - start)
  })
  return <div>{props.children}</div>
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Meature>{useRoutes(routes)}</Meature>
    </Suspense>
  )
}

const app = createRoot(document.getElementById('root')!)

app.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
