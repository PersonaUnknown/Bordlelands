import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// Models
import { SettingsContext } from "../components/Modals/SettingsContext"
import { getFlavorTexts, RedTextEntry } from "../models/fileLoader"
import { SingleGuess } from "../models/guess"
import { getRandomFlavorText } from "../models/rng"
// Static UI
import RedTextHints from "../components/Guesses/RedText/RedTextHints"
import NavigationBar from "../components/Navigation/NavigationBar"
import { ImSpinner8 } from "react-icons/im";
// Searches
import RedTextSearchBar from "../components/Guesses/RedText/RedTextSearchBar"
import SingularGuess from "../components/Guesses/SingularGuess"
// Modals
import SettingsModal from "../components/Modals/SettingsModal"
import TutorialModal from "../components/Modals/TutorialModal"
import VictoryModal from "../components/Modals/VictoryModal"
const ImageGuess = () => {
    // States
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
    const [showTutorialModal, setShowTutorialModal] = useState<boolean>(false)
    const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false)
    const [currGuesses, setCurrGuesses] = useState<SingleGuess[]>([])
    const [dataLoaded, setDataLoaded] = useState<boolean>(false)
    const [itemData, setItemData] = useState<RedTextEntry[]>([])
    const [correctAnswer, setCorrectAnswer] = useState<RedTextEntry | null>(null)
    const [guessedCorrectly, setGuessedCorrectly] = useState<boolean>(false)
    const [toggledUnblurOnGuess, setToggleUnblurOnGuess] = useState<boolean>(false)
    const appendGuess = (newEntry: RedTextEntry) => {
        let parsedNewEntry: string = JSON.stringify(newEntry)
        let parsedAnswer: string = JSON.stringify(correctAnswer)
        if (parsedNewEntry === parsedAnswer) {
            setTimeout(() => {
                handleShowVictory()
            }, 500)
            setGuessedCorrectly(true)
            localStorage.setItem("guessedImageCorrectly", "true")
            // console.log("Guessed Correctly!")
        }
        let newCurrGuess: SingleGuess = { guess: newEntry, loadOnStart: true }
        let oldGuesses: SingleGuess[] = currGuesses
        if (oldGuesses.length > 0) {
            oldGuesses[0].loadOnStart = false
        }
        let newGuesses: SingleGuess[] = [newCurrGuess, ...oldGuesses]
        localStorage.setItem("currImageGuesses", JSON.stringify(newGuesses))
        setCurrGuesses(newGuesses)
    }
    const handleShowSettings = () => { setShowSettingsModal(true) }
    const handleCloseSettings = () => { setShowSettingsModal(false) }
    const handleShowTutorial = () => { setShowTutorialModal(true) }
    const handleCloseTutorial = () => { setShowTutorialModal(false) }
    const handleShowVictory = () => { setShowVictoryModal(true) }
    const handleCloseVictory = () => { setShowVictoryModal(false) }
    const toggleUnblurSetting = () => {
        setToggleUnblurOnGuess(!toggledUnblurOnGuess)
    }
    // Context
    const { weaponsSettings } = useContext(SettingsContext)
    // Re-rolling
    const rerollItem = () => {
        setDataLoaded(false)
        localStorage.removeItem("currImageGuesses")
        localStorage.removeItem("randomImageEntry")
        localStorage.removeItem("oldWeaponsSettings")
        localStorage.removeItem("guessedImageCorrectly")
        setCurrGuesses([])
        setGuessedCorrectly(false)
    }
    // Effect
    useEffect(() => {
        const fetchValidWeapons = () : string[] => {
            let games = ["borderlands-1", "borderlands-2", "borderlands-3", "borderlands-tps", "wonderlands"]
            if (weaponsSettings === null) {
                console.error("The settings are null! Resorting to default values.")
                localStorage.setItem("oldWeaponsSettings", JSON.stringify(games))
                return games
            }
            let items: string[] = []
            // Check weapons
            let weaponStatuses: boolean[] = weaponsSettings
            for (let i = 0; i < weaponStatuses.length; i++) {
                let status: boolean = weaponStatuses[i]
                if (status) {
                    items.push(games[i])
                }
            }
            localStorage.setItem("oldWeaponsSettings", JSON.stringify(items))
            return items
        }
        const fetchWeapons = () => {    
            let itemCheck = localStorage.getItem("randomImageEntry")
            if (itemCheck !== null) {
                let oldRandomEntry: RedTextEntry = JSON.parse(itemCheck)
                let oldCurrGuesses: SingleGuess[] = JSON.parse(localStorage.getItem("currImageGuesses") ?? "[]")
                for (let i = 0; i < oldCurrGuesses.length; i++) {
                    oldCurrGuesses[i].loadOnStart = false
                }
                let oldWeaponsSettings: string[] = JSON.parse(localStorage.getItem("oldWeaponsSettings") ?? `["borderlands-1", "borderlands-2", "borderlands-3", "borderlands-tps", "wonderlands"]`)
                let oldFetchedData = getFlavorTexts(oldWeaponsSettings)
                // Check guessed correctly
                let correctGuessCheck: boolean = JSON.parse(localStorage.getItem("guessedImageCorrectly") ?? "false")
                setGuessedCorrectly(correctGuessCheck)
                setCurrGuesses(oldCurrGuesses)
                setCorrectAnswer(oldRandomEntry)
                setItemData(oldFetchedData)
                setDataLoaded(true)
                return
            }
            let validWeapons = fetchValidWeapons()
            let fetchedData = getFlavorTexts(validWeapons)
            let randomEntry = getRandomFlavorText(fetchedData)
            setCorrectAnswer(randomEntry)
            setItemData(fetchedData)
            setDataLoaded(true)
            localStorage.setItem("currImageGuesses", JSON.stringify([]))
            localStorage.setItem("randomImageEntry", JSON.stringify(randomEntry))
        }

        if (dataLoaded || weaponsSettings.length <= 0) {
            return
        }

        setTimeout(() => {
            fetchWeapons()
        }, 250)
    }, [dataLoaded, itemData, weaponsSettings])
    // Styles
    const classicStyle = {
        fontSize: 26,
        color: 'white'
    }
    const imgContainerStyle = {
        color: '#ffffff', 
        backgroundColor: '#102332', 
        border: '2px solid #1d9dff', 
        borderRadius: 10, 
        padding: 10,
        marginTop: 15,
        marginBottom: 15
    }
    // Rendering
    if (!dataLoaded || correctAnswer === null) {
        return (
            <div className="flex flex-column center-horizontal center-text" style={{gap: 20}}>
                <span style={{fontSize: 40, color: 'white'}}>
                    Loading data...
                </span>
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ 
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 2, // Duration of one full rotation
                        ease: 'linear', // Smooth rotation
                    }}
                >
                    <ImSpinner8 color="white" style={{width: 50, height: 50}}/>
                </motion.div> 
            </div>
        )
    }
    return (
        <div className="flex flex-column center-horizontal center-text">
            <SettingsModal show={showSettingsModal} handleClose={handleCloseSettings}/>
            <TutorialModal show={showTutorialModal} handleClose={handleCloseTutorial} tutorialMode="image"/>
            <VictoryModal show={showVictoryModal} name={correctAnswer.name} handleClose={handleCloseVictory}/>
            <NavigationBar
                handleSettingsShow={handleShowSettings}
                handleReroll={rerollItem}
                handleTutorialShow={handleShowTutorial}
            />
            <RedTextHints answer={correctAnswer} numGuesses={currGuesses.length} answeredCorrectly={guessedCorrectly} useRedTextHint/>
            <div className="flex flex-column center-horizontal margin-bottom">
                <span className="common" style={classicStyle}>
                    What item is in this blurred image?
                </span>
                <div style={imgContainerStyle} className="flex flex-column">    
                    <img alt='answer' src={correctAnswer.image} style={{filter: toggledUnblurOnGuess ? `blur(12px)` : `blur(${Math.max(12 - currGuesses.length, 0)}px)`}}/>
                    <div style={{marginTop: 15, marginBottom: 5}}>
                        <button style={{backgroundColor: 'gold', borderColor: 'transparent', borderRadius: 50}} onClick={toggleUnblurSetting}>
                            {toggledUnblurOnGuess ? <FaRegEyeSlash style={{width: 50, height: 50, opacity: 0.5}}/> : <FaRegEye style={{width: 50, height: 50}}/> }
                        </button>
                    </div>
                    {!toggledUnblurOnGuess && "Each try unblurs the image a bit"}
                </div>
                <RedTextSearchBar 
                    entries={itemData} 
                    currGuesses={currGuesses.map(entry => entry.guess)} 
                    guessedCorrectly={guessedCorrectly}
                    onSubmitCallback={appendGuess}
                    haveImages={false}
                />
            </div>
            {currGuesses.map((currGuess) => {
                return (
                    <SingularGuess
                        key={`${currGuess.guess.name}-${currGuess.guess["flavor-text"]}`}
                        guess={currGuess.guess}
                        actual={correctAnswer}
                        loadOnStart={currGuess.loadOnStart}
                    />
                )
            })}
        </div>
    )
}

export default ImageGuess