import React, {useState, useEffect} from 'react';
import api from './services/api'

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente Pai passa para o componente Filho
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

import './global.css'
import './App.css'
import './Aside.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {

  const [devs, setDevs] = useState([])
 
  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data){
    const response = await api.post('/devs', data)
       
    setDevs([...devs, response.data])

  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            < DevItem key={dev._id} dev={dev} />
          ))}   
        </ul>
      </main>
    </div>
  );
}

export default App;
