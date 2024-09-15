import LinkTab from "../components/Navigation/LinkTab"
import Classic from '../images/classic.png'
import RedText from '../images/redtext.png'
import LootPool from '../images/lootpool.png'
import BlurryImage from '../images/blurry.png'
const Home = () => {
    return (
        <div className='flex flex-column'>
            <span className="center-horizontal font-montserrat margin-bottom home-text" style={{color: 'white'}}>
                Guess Borderlands items
            </span>
            <div className="flex flex-column center-horizontal" style={{gap: 20}}>    
                <LinkTab label="Classic" description='Get clues on every try' route="classic" imgSrc={Classic}/>    
                <LinkTab label="Flavor Text" description='Guess based on flavor text' route='redtext' imgSrc={RedText}/>
                <LinkTab label="Loot Pool" description='Guess based on enemy' route='lootpool' imgSrc={LootPool}/>
                <LinkTab label="Image" description='Guess based on image' route='image' imgSrc={BlurryImage}/> 
            </div>
        </div>
    )
}

export default Home