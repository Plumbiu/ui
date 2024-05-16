# @plumbiu/ui

> 🚧 Work in Progress

ui for [my blog](https://github.com/Plumbiu/blog)

# Usage

```bash
npm install @plumbiu/ui
```

```jsx
// import style first
import '@plumbiu/ui/style.css'
import { Button } from '@plumbiu/ui'

export default function Demo() {
  return <Button>Button</Button>
}
```

## bundleSize

@plumbiu/ui v0.0.1

┌────────┬────────────┐
│ export │ min+brotli │
│        │            │
│ Table  │    10.3 kB │
│ Modal  │    9.75 kB │
│ Alert  │    9.42 kB │
│ Tag    │    9.11 kB │
│ Input  │    9.05 kB │
│ Link   │     8.9 kB │
│ Button │    8.82 kB │
└────────┴────────────┘