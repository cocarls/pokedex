import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import HeaderPokeball from "../components/layouts/HeaderPokeball"
import { bgByType, textByType } from "../constants/pokemon"

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null)

  const firtType = pokemon?.types[0].type.name


  const {pokemonId} = useParams()

  const types = pokemon?.types.map((type)=> type.type.name).join(" | ")

  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1)
    return `${percentStat}%`
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({data})=> setPokemon(data))
      .catch((err)=> console.log(err))
  }, [])
  
  return (
    <main className=" text-center  capitalize">
      <HeaderPokeball />
      
      {/* left-1/2 -translate-x-1/2 */}
      <article className="max-w-[700px] py-10 px-2 mx-auto relative">

      {/* <div className=" relative sm:w-[700px] border-2 border-slate-300"> */}

       

        <div className={` h-[130px] ${bgByType[firtType]}`}>

        </div>
        <header className="flex justify-center absolute left-1/2 -translate-x-1/2 top-[1px]">
          <img className="max-w-[180px] sm:max-w-[190px]" src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </header>

         <div className="flex justify-center mt-4">
           <h3 className="font-semibold">#{pokemon?.id}</h3>
         </div>
        
          <div className="flex justify-center">
            
           <h2 className="font-semibold text-2xl"> <hr /> {pokemon?.name} <hr /></h2>
           
          </div>
        

        {/* aporte */}
        <section className="flex justify-center mt-5 gap-5">
          <div>
            <div className="font-medium">weight</div>
            <div className="font-bold">{pokemon?.weight}</div>
          </div>
          <div>
            <div className="font-medium">height</div>
            <div className="font-bold">{pokemon?.height}</div>
          </div>
        </section>

        <section className="sm:flex sm:justify-center sm:gap-9">
          
          <div className="grid mt-4 border-2 border-slate-300 sm:p-3">
            <div className="font-mono text-lg font-semibold">type</div>
            <div className="flex justify-center gap-5">
              <span className={`font-black  ${textByType[firtType]} p-1`}>{types}</span>
            </div>
            
            {/* <div>
              <div>{pokemon?.types[0].type.name}</div>
              <div>{pokemon?.types[1].type.name}</div>
            </div> */}
          </div>
          <div className="grid mt-4 border-2 border-slate-300 sm:p-3">
             <div className="font-mono text-lg font-semibold">skills</div>
             <div className="flex justify-center gap-5">
               <div className="font-black">{pokemon?.abilities[0].ability.name}</div>
               <div className="font-black">{pokemon?.abilities[1].ability.name}</div>
             </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-7 p-5">
          <h3 className="text-start text-lg font-semibold">stats</h3>
          <ul className="grid gap-4">
            {
              pokemon?.stats.map((stat)=> 

              <li className="capitalize" key={stat.stat.name}>
                <div className="flex justify-between items-center">
                  <h5>{stat.stat.name}</h5>
                  <span>{stat.base_stat}/255</span>
                </div>
                {/* total bar */}
                <div className="bg-slate-200 rounded-md h-6 overflow-hidden">
                  {/* Bar progress */}
                  <div style={{width : getPercentStat(stat.base_stat)}} className={`bg-yellow-400 h-full`}></div>
                </div>
              </li>)
            }
          </ul>
        </section>

       
      </article>

    </main>
  )
}
export default PokemonDetail