import { ViteReactSSG } from 'vite-react-ssg/single-page'
import MVPClubWebsite from './mvp-club-site.jsx'
import './index.css'

export const createRoot = ViteReactSSG(<MVPClubWebsite />)
