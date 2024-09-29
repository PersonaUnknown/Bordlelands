import { RedTextEntry } from "../../models/fileLoader"
import { getColor } from "../../models/colors"
import { motion } from "framer-motion"
import useWindowDimensions from "../../models/windowDimensions"
const SingularGuess = ({guess, actual, loadOnStart, useImage = false}: SingularGuessProps) => {
    const { width } = useWindowDimensions()
    const containerStyle = {
        color: 'white',
        backgroundColor: getColor(guess["flavor-text"] === actual['flavor-text']),
        padding: 15,
        marginBottom: 15,
        width: width > 600 ? 400 : 280,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
    const animation = loadOnStart ? guess["flavor-text"] !== actual['flavor-text'] ? { x: [0, 10, -10, 0] } : { scale: [1.0, 1.15, 1.0] } : {}
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
interface SingularGuessProps {
    guess: RedTextEntry,
    actual: RedTextEntry,
    loadOnStart: boolean,
    useImage?: boolean
}
export default SingularGuess