import { useDispatch } from "react-redux"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
       e.preventDefault()
       dispatch(setTrainerName(e.target.trainerName.value))
       navigate("/pokedex")
    }
    
  return (
    <main className=" ">
        <section className="m-2">
             <div className="grid justify-center mt-32">
                <div className="w-[300px] sm:w-[500px]">
                    <img src="/images/logo.png" alt="" />
                </div>
                <h3 className="text-[#FE1936] font-extrabold sm:text-[60px] text-[30px] mx-auto mt-9">!Hi Coach!</h3>
                <p className="text-[#302F2F] font-semibold text-lg mx-auto mt-3">to start, give me your name:</p>
                <form className=" flex gap-2 text-white bg-[#FE1936] hover:bg-red-600 transition-colors h-10  mx-auto mt-6" onSubmit={handleSubmit}>
                    <input className="outline-none px-2 sm:w-[250px] text-black border-solid border-2 border-gray-200" name="trainerName" type="text" placeholder=" Your name..."/>
                    <button className="px-7 font-medium justify-center items-center">Start!</button>
                </form>
             </div>
        </section>

        <footer className="max-sm:mt-[194px] sm:mt-[114px]">
          <div className="relative">
            <div className=" absolute bottom-4 left-1/2 -translate-x-1/2">
              <img className="w-[59px]" src="/images/circulo.png" alt="" />
            </div>
            <div className="w-[100%] h-[57px] bg-[#FE1936]"></div>
            <div className="w-[100%] h-[33px] bg-black"></div>
          </div>
            
        </footer>
    </main>
  )
}
export default Home