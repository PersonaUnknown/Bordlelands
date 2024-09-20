import { useState } from "react"
import { Entry } from "../../models/fileLoader"
import { Placement } from "react-bootstrap/esm/types";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Flavor from '../../images/hints/flavor-text.png'
import Globe from '../../images/hints/globe.png'
const Hints = ({numGuesses, answer, answeredCorrectly}: HintsProps) => {
    // States
    const [flavorTextModal, setFlavorTextModal] = useState<boolean>(false)
    const [dropOriginModal, setDropOriginModal] = useState<boolean>(false)
    const toggleFlavorTextModal = () => {
        setFlavorTextModal(!flavorTextModal)
        setDropOriginModal(false)
    }
    const toggleDropOriginModal = () => {
        setDropOriginModal(!dropOriginModal)
        setFlavorTextModal(false)
    }
    // Render
    const containerStyle = {
        backgroundColor: '#102332',
        border: '2px solid #1d9dff', 
        borderRadius: 10,
        marginLeft: '20%',
        marginRight: '20%',
        marginBottom: 15,
        justifyContent: 'space-evenly',
        padding: 5
    }
    const hintStyle = {
        color: 'white',
        fontSize: 18,
        padding: 10
    }
    const HintButton = ({onPress, imgSrc, alt, label, threshold, meaning, tooltipDir}: HintButtonProps) => {
        const clueCount: number = answeredCorrectly ? 0 : Math.max(threshold - numGuesses, 0)
        const description: string = `${label} clue in ${clueCount} guesses`
        const tooltipStyle = {
            color: '#ffffff', 
            backgroundColor: '#102332', 
            border: '2px solid #1d9dff', 
            position:"fixed" as const,
            borderRadius: 10, 
            padding: 10, 
            fontSize: 18
        }
        const imgStyle = {
            width: 75,
            height: 75,
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: clueCount <= 0 ? 1 : 0.5
        }
        const btnStyle = {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'white',
            opacity: clueCount <= 0 ? 1 : 0.5
        }
        return (
            <OverlayTrigger
                placement={tooltipDir}
                overlay={
                    <Tooltip className="font-montserrat" style={tooltipStyle}> 
                        {meaning}
                    </Tooltip>
                }
            >
                <div className="center-vertical center-horizontal">
                    <button onClick={() => { if (clueCount <= 0) onPress()}} style={btnStyle} className="flex flex-column">
                        <img alt={alt} src={imgSrc} style={imgStyle}/>
                        <span>
                            {description}
                        </span>
                    </button>
                </div>
            </OverlayTrigger>
        )
    }
    return (
        numGuesses <= 1 ?
        <div/>
        :
        <div style={containerStyle} className="flex flex-column">
            <div className="flex flex-row">
                <HintButton
                    alt="flavor"
                    imgSrc={Flavor}
                    onPress={toggleFlavorTextModal}
                    label="Flavor Text"
                    threshold={7}
                    meaning="Item's Red Text"
                    tooltipDir="left"
                />
                <HintButton
                    alt="globe"
                    imgSrc={Globe}
                    onPress={toggleDropOriginModal}
                    label="Drop Origin"
                    threshold={12}
                    meaning="Who/What Drops The Item If It Exists"
                    tooltipDir="right"
                />
            </div>
            {flavorTextModal &&
                <span className="font-montserrat" style={hintStyle}>
                    Flavor Text: {answer["flavor-text"]}
                </span>  
            }
            {dropOriginModal &&
                <span className="font-montserrat" style={hintStyle}>
                    Origin(s): {answer["drop-sources"].length <= 0 ? "N/A" : answer["drop-sources"].join(", ")}
                </span>
            }
        </div>
    )
}
interface HintButtonProps {
    onPress: () => void,
    imgSrc: string,
    alt: string,
    label: string,
    meaning: string,
    threshold: number,
    tooltipDir: Placement
}
interface HintsProps {
    numGuesses: number,
    answer: Entry,
    answeredCorrectly: boolean
}
export default Hints