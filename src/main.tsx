import { BrowserRouter } from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.tsx'


// ! - исключает из типа null, т.е. я уверена, что root существует
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
       <Provider store={store}>
        <App />
      </Provider>
     </BrowserRouter> 
  </StrictMode>,
)
