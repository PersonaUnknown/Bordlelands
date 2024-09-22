import { useRef, useState } from "react"
import { RedTextEntry } from "../../../models/fileLoader";
import { Placement } from "react-bootstrap/esm/types";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Type from '../../../images/hints/type.png'
import Flavor from '../../../images/hints/flavor-text.png'
import Globe from '../../../images/hints/globe.png'
const RedTextHints = ({numGuesses, answer, answeredCorrectly, useRedTextHint}: HintsProps) => {
    // States
    const [typeTextModal, setTypeTextModal] = useState<boolean>(false)
    const [dropOriginModal, setDropOriginModal] = useState<boolean>(false)
    const toggleTypeTextModal = () => {
        setTypeTextModal(!typeTextModal)
        setDropOriginModal(false)
    }
    const toggleDropOriginModal = () => {
        setDropOriginModal(!dropOriginModal)
        setTypeTextModal(false)
    }
    // Render
    const containerStyle = {
        backgroundColor: '#102332',
        border: '2px solid #1d9dff', 
        maxWidth: 425,
        borderRadius: 10,
        marginLeft: '15%',
        marginRight: '15%',
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
        const description: string = `${label} Clue in ${clueCount} guesses`
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
                <div className="center-horizontal">
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
        numGuesses <= 1 && !answeredCorrectly ?
        <div/>
        :
        <div style={containerStyle} className="flex flex-column">
            <div className="flex flex-row">
                {useRedTextHint === null || !useRedTextHint ?
                    <HintButton
                        alt="type"
                        imgSrc={Type}
                        onPress={toggleTypeTextModal}
                        label="Item Type"
                        threshold={4}
                        meaning="Pistol, shotgun, etc..."
                        tooltipDir="left"
                    />
                    :
                    <HintButton
                        alt="flavor"
                        imgSrc={Flavor}
                        onPress={toggleTypeTextModal}
                        label="Flavor Text"
                        threshold={4}
                        meaning="Item's Red Text"
                        tooltipDir="left"
                    />
                }
                <HintButton
                    alt="globe"
                    imgSrc={Globe}
                    onPress={toggleDropOriginModal}
                    label="Drop Origin"
                    threshold={8}
                    meaning="Who/What Drops The Item If It Exists"
                    tooltipDir="right"
                />
            </div>
            {typeTextModal &&
                <span className="font-montserrat" style={hintStyle}>
                    {useRedTextHint === null || !useRedTextHint ? `Item Type: ${answer.type}` : `Flavor Text: ${answer["flavor-text"]}`}
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
    answer: RedTextEntry,
    answeredCorrectly: boolean,
    useRedTextHint?: boolean
}
export default RedTextHints