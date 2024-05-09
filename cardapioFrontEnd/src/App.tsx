import { useState } from 'react'
import './App.css'

import {Card} from './components/card/card'
import { useFoodData } from './hooks/useFoodData'
import { CreateModal } from './components/modal/create-modal'

function App() {//componente principal da aplicação

  const { data = [] } = useFoodData(); //dados provindos da API backend, com interface definida por um arquivo de interface
                                  //utiliza uma função axios para retrieve dos dados

  const [isModalOpen, setIsModalOpen] = useState(false);//variavel que define quando uma div será exibida ou não

  const handleOpenModal = () =>{
    setIsModalOpen(prev => !prev)//função que inverte o valor da variavel isModalOpen (true=>false, false=>true)
  }

  return (
      <div className="container">
        <h1>Cardápio</h1>
        <div className="card-grid">

          {/* pelo fato de que a variavel data é um valor provindo de uma função assincrona de axios, ela corre o risco de não possuir valores 
          (estar indefinida por motivos de falha de conexão, etc), logo, é necessario utilizar o marcador '?' para indicar que ela pode estar indefinida*/}
          {data?.map(foodData => 
            <Card 
              price = {foodData.price} 
              title = {foodData.title} 
              image = {foodData.image}
              id = {foodData.id || ''}//por id se tratar de uma variável que pode estar vazia, ou ela receberá o valor retornado de foodData ou receberá um valor padrão vazio
            />
          )}{/* mapeia todos os elementos da variavel data e os renderiza num componente card, para cada item presente no data*/}
        </div>
        {isModalOpen && <CreateModal closeModal = {handleOpenModal}/>}{/* se isModalOpen for true, exibe o retorno da função CreateModal (container html) e, ao fechar de novo, chama a função handleOpenModal*/}
        <button onClick={handleOpenModal}>New Food</button>{/* quando o botão for apertado, inverte a exibição de CreateModal */}
      </div>
  )
}

export default App

/* const function = () => {<<corpo da função>>}; é uma declaração de função local */ 