import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <AppRouter />
      <Toaster richColors position="top-right" />
    </TooltipProvider>
  </StrictMode>,
)
