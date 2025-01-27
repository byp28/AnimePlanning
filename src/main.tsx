import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import {Store} from './store.ts'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <App />
  </Provider>,
)
