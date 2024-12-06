import { Calculator } from "./components/Calculator"
import { Results } from "./components/Results"

function App() {
  
  return (
    <div className="w-screen h-screen flex justify-center items-center max-md:justify-start max-md:h-full bg-slate-200">
      <div className="flex bg-white shadow-sm rounded-xl max-md:flex-col max-md:w-full">
          <Calculator/>
          <Results/>
      </div>
    </div>
  )
}

export default App
