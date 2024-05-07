import { createTheme } from 'vite-pages-theme-doc'
import Component404 from './404'
import './styles.css'

export default createTheme({
  logo: <div style={{ fontSize: '20px' }}>📘 @plumbiu/ui</div>,
  topNavs: [
    {
      label: '首页',
      path: '/',
      activeIfMatch: {
        // match all first-level paths
        path: '/:foo',
        end: true,
      },
    },
    {
      label: '组件',
      path: '/components/demos',
      activeIfMatch: '/components/demos/:foo',
    },
    { label: 'Github', href: 'https://github.com/Plumbiu/ui' },
    {
      label: 'Blog',
      href: 'https://github.com/Plumbiu/blog',
    },
  ],
  Component404,
})
