import { Entry, LootSource } from "../../../models/fileLoader"
import { getColor } from "../../../models/colors"
import { motion } from "framer-motion"
const LootSourceGuess = ({guess, actual, loadOnStart, useImage = false}: LootSourceGuessProps) => {
    const containerStyle = {
        color: 'white',
        backgroundColor: getColor(guess["drop-sources"].includes(actual.name)),
        padding: 15,
        marginBottom: 15,
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
    const animation = loadOnStart ? guess["drop-sources"].includes(actual.name) ? { scale: [1.0, 1.15, 1.0] } : { x: [0, 10, -10, 0] } : {}
    return (
        <motion.div 
            className="font-montserrat" 
            style={containerStyle}
            animate={animation}
        >
            {useImage && <img alt='item' src={guess.image}/>}
            {guess.name}
        </motion.div>
    )
}
interface LootSourceGuessProps {
    guess: Entry,
    actual: LootSource,
    loadOnStart: boolean,
    useImage?: boolean
}
export default LootSourceGuess