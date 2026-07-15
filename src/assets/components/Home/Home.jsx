import Mercury from './planets/Mercury'
import Venus from './planets/Venus'
import Earth from './planets/Earth'
import Mars from './planets/Mars'
import Jupiter from './planets/Jupiter'
import Saturn from './planets/Saturn'
import Uranus from './planets/Uranus'
import Neptune from './planets/Neptune'
import Pluto from './planets/Pluto'
    
const Home = () => {
    return (
        <div className="grid grid-cols-3 justify-items-center py-10 gap-10">
          <Mercury />
          <Venus />
          <Earth />
          <Mars />
          <Jupiter />
          <Saturn />
          <Uranus />
          <Neptune />
          <Pluto />
        </div>
    )
}

export default Home