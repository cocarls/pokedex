
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Poquedex from './pages/Poquedex'
import PokemonDetail from './pages/PokemonDetail'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route element={<PrivateRoutes />}>
          <Route path='/pokedex' element={<Poquedex />}/>
          <Route path='/pokedex/:pokemonId' element={<PokemonDetail />}/>
        </Route>
       
      </Routes>
    </div>
  )
}

export default App
