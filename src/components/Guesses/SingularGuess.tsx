import { RedTextEntry } from "../../models/fileLoader"
import { getColor } from "../../models/colors"
import { motion } from "framer-motion"
const SingularGuess = ({guess, actual, loadOnStart}: SingularGuessProps) => {
    const containerStyle = {
        color: 'white',
        backgroundColor: getColor(guess["flavor-text"] === actual['flavor-text']),
        padding: 15,
        marginBottom: 15,
        width: 400,
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
            {guess.name}
        </motion.div>
    )
}
interface SingularGuessProps {
    guess: RedTextEntry,
    actual: RedTextEntry,
    loadOnStart: boolean
}
export default SingularGuess