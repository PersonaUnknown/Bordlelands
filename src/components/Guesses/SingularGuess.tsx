import { RedTextEntry } from "../../models/fileLoader"
import { getColor } from "../../models/colors"
const SingularGuess = ({guess, actual}: SingularGuessProps) => {
    const containerStyle = {
        color: 'white',
        backgroundColor: getColor(guess["flavor-text"] === actual['flavor-text'])
    }
    return (
        <div className="font-montserrat" style={containerStyle}>
            {guess.name}
        </div>
    )
}
interface SingularGuessProps {
    guess: RedTextEntry,
    actual: RedTextEntry
}
export default SingularGuess