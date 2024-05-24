import { useLayoutEffect, useRef, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import routes from '~react-pages'

function Measure(props: any) {
  const start = performance.now()
  const ref = useRef<any>(null)

  useLayoutEffect(() => {
    // Force layout
    ref.current?.getBoundingClientRect?.()

    const end = performance.now()
    console.log(props.children.props.match.pathname, end - start)
  })

  return <div ref={ref}>{props.children}</div>
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Measure>{useRoutes(routes)}</Measure>
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
