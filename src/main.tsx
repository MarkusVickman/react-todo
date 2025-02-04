import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<div className='page-container'>
      <div className="page-height-without-footer">
        <Header title={"Att göra-listan"} />
        <main>
          <App />
        </main>
      </div>
      <Footer />
    </div>
  </StrictMode>,
)
