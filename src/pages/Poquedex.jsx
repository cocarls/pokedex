import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PokemonList from "../components/pokedex/PokemonList"
import HeaderPokeball from "../components/layouts/HeaderPokeball"
import { paginateData } from "../utils/pagination"
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react"

const Poquedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [pokemonName, setPokemonName] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setcurrentPage] = useState(1)

  const trainerName = useSelector((store)=> store.trainerName)

  const pokemonsByName = pokemons.filter((pokemon)=> pokemon.name.includes(pokemonName))
  
  const {itemsInCurrentPage, lastPage, pagesInCurrentBlock} = paginateData(pokemonsByName, currentPage)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim()) 
  }

  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

  const handlePreviusPage = () =>{
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1){
      setcurrentPage(newCurrentPage)
    }
 
  }

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage){
      setcurrentPage(newCurrentPage)
    }
    
  }

  //trae todo los pokemons
  useEffect(()=>{
    if(currentType === ""){
      axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
      .then(({data})=> setPokemons(data.results))
      .catch((err)=> console.log(err))
    }
     
  },[currentType])

  //trae todos los types disponibles para los pokemons
  useEffect(()=>{
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({data})=> setTypes(data.results))
      .catch((err)=> console.log(err))
 },[])

 //traer todos los pokemons con base a un type
 useEffect(() => {
   if(currentType != ""){
    axios
      .get(`https://pokeapi.co/api/v2/type/${currentType}`)
      .then(({data})=> {
        setPokemons(data.pokemon.map((pokemon)=> pokemon.pokemon))
      })
      .catch((err)=> console.log(err))
   }
 }, [currentType])

 //cambiar a pagina uno siempre
 useEffect(() => {
   setcurrentPage(1)
 }, [currentType])
 
 

  return (
   <main>
    <HeaderPokeball />
    <section className="m-2">
      <p className="sm:flex justify-center max-sm:grid max-sm:ml-5 text-[#302F2F] font-semibold text-lg  mt-3">
        <span className="text-[#FE1936]">Welcome {trainerName},</span>
        here you cand find your favorite pokemon
      </p>

      <form className="sm:flex justify-center gap-8  transition-colors mt-5" onSubmit={handleSubmit}>
        <div className="max-sm:flex  max-sm:justify-center">
          <input className="outline-none sm:w-[250px] text-black border-solid border-2 sm:px-3 sm:py-2" name="pokemonName" type="text" />
          <button className="bg-red-500 text-white px-2 sm:px-7 sm:py-2 border-solid border-2 border-red-500 hover:bg-red-600 transition-colors">Search</button>
        </div>

        <select onChange={handleChangeType} className="capitalize max-sm:mt-3 border-solid border-2 border-y-gray-400 max-sm:ml-5">
          <option className="" value="">All pokemon</option>
          {
            types.map((type)=> <option value={type.name} className="capitalize" key={type.url}>{type.name}</option>)
          }
        </select>
      </form>
    </section>

    <PokemonList pokemons={itemsInCurrentPage} />

    <ul className="flex justify-center gap-4 flex-wrap pb-5">
      {
        currentPage != 1 && (
          <li className="mt-2">
          <button className="hover:text-red-700" onClick={handlePreviusPage}><IconArrowNarrowLeft /></button>
          </li>
        )
      }
      
      {pagesInCurrentBlock.map((page)=>(
        <li key={page}>
          <button onClick={()=> setcurrentPage(page)} className={` p-2 text-black font-bold rounded-sm ${
            currentPage === page ? "bg-red-500" : "bg-red-300 transition-colors hover:text-white hover:bg-red-500"
          }`}>
            {page}
          </button>
        </li>
      ))}
      {
        currentPage != lastPage && (
          <li className="mt-2 ">
          <button className="hover:text-red-700" onClick={handleNextPage}><IconArrowNarrowRight /></button>
        </li>
        )
      }
     
    </ul>

    
   </main>
  )
}
export default Poquedex