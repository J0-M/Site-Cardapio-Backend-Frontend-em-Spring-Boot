import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

//No react, há esse arquivo main
//O main é responsável por declarar a conexão do react com o html

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(//delcara a conexão da aplicação react e renderiza com a pagina html (index.html <-> app.tsx)
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>{/*configuração necessária do react query para funcionar, necessário para consumir adequadamente a API*/}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
