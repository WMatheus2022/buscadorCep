import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

 
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
   //20031900/json/
   if(input === ''){
    alert("Preencha com algum cep válido!")
    return;
   }

   try {
    const response = await api.get(`${input}/json`);
    setCep(response.data)
    setInput("");
   } catch {
    alert('Error na busca');
    setInput("")
   }
  }

  return (
    <div className="container">
      <h1 className="title">Bucador de CEP</h1>

      <div className="containerInput">
        <input type="text"
         placeholder="digite seu cep aqui..."
         value={input}
         onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#000'/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
              <main className="main">
              <h2>CEP: {cep.cep}</h2>
      
              <span>{cep.logradouro}</span>
              <span>Complento: {cep.complemento}</span>
              <span>{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
            
            </main>
      )}

    </div>
  );
}

export default App;
