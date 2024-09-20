import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
// Models
import { SettingsContext } from "../components/Modals/SettingsContext"
import { getFlavorTexts, RedTextEntry } from "../models/fileLoader"
import { getRandomFlavorText } from "../models/rng"
// Static UI
import NavigationBar from "../components/Navigation/NavigationBar"
import { ImSpinner8 } from "react-icons/im";
// Searches
import RedTextSearchBar from "../components/Guesses/RedTextSearchBar"
import SingularGuess from "../components/Guesses/SingularGuess"
const RedText = () => {
    // States
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
    const [showTutorialModal, setShowTutorialModal] = useState<boolean>(false)
    const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false)
    const [currGuesses, setCurrGuesses] = useState<RedTextEntry[]>([])
    const [dataLoaded, setDataLoaded] = useState<boolean>(false)
    const [itemData, setItemData] = useState<RedTextEntry[]>([])
    const [correctAnswer, setCorrectAnswer] = useState<RedTextEntry | null>(null)
    const [guessedCorrectly, setGuessedCorrectly] = useState<boolean>(false)
    const appendGuess = (newEntry: RedTextEntry) => {
        let parsedNewEntry: string = JSON.stringify(newEntry)
        let parsedAnswer: string = JSON.stringify(correctAnswer)
        if (parsedNewEntry === parsedAnswer) {
            setTimeout(() => {
                handleShowVictory()
            }, 500)
            setGuessedCorrectly(true)
            localStorage.setItem("guessedFlavorCorrectly", "true")
            // console.log("Guessed Correctly!")
        }
        let newGuesses: RedTextEntry[] = [newEntry, ...currGuesses]
        localStorage.setItem("currFlavorGuesses", JSON.stringify(newGuesses))
        setCurrGuesses(newGuesses)
    }
    const handleShowSettings = () => { setShowSettingsModal(true) }
    const handleCloseSettings = () => { setShowSettingsModal(false) }
    const handleShowTutorial = () => { setShowTutorialModal(true) }
    const handleCloseTutorial = () => { setShowTutorialModal(false) }
    const handleShowVictory = () => { setShowVictoryModal(true) }
    const handleCloseVictory = () => { setShowVictoryModal(false) }
    // Context
    const { weaponsSettings } = useContext(SettingsContext)
    // Re-rolling
    const rerollItem = () => {
        setDataLoaded(false)
        localStorage.removeItem("currFlavorGuesses")
        localStorage.removeItem("randomFlavorEntry")
        localStorage.removeItem("oldWeaponsSettings")
        localStorage.removeItem("guessedFlavorCorrectly")
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
            let itemCheck = localStorage.getItem("randomFlavorEntry")
            if (itemCheck !== null) {
                let oldRandomEntry: RedTextEntry = JSON.parse(itemCheck)
                let oldCurrGuesses: RedTextEntry[] = JSON.parse(localStorage.getItem("currFlavorGuesses") ?? "[]")
                let oldWeaponsSettings: string[] = JSON.parse(localStorage.getItem("oldWeaponsSettings") ?? `["borderlands-1", "borderlands-2", "borderlands-3", "borderlands-tps", "wonderlands"]`)
                let oldFetchedData = getFlavorTexts(oldWeaponsSettings)
                // Check guessed correctly
                let correctGuessCheck: boolean = JSON.parse(localStorage.getItem("guessedFlavorCorrectly") ?? "false")
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
            localStorage.setItem("currFlavorGuesses", JSON.stringify([]))
            localStorage.setItem("randomFlavorEntry", JSON.stringify(randomEntry))
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
    const columnStyle = {
        gap: 10
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
            <NavigationBar
                handleSettingsShow={handleShowSettings}
                handleReroll={rerollItem}
                handleTutorialShow={handleShowTutorial}
            />
            <div className="flex flex-column center-horizontal margin-bottom">
                <span className="common" style={classicStyle}>
                    What item has this flavor text?
                </span>
                <span style={{...classicStyle, color: 'red'}}>
                    {correctAnswer["flavor-text"]}
                </span>
                <RedTextSearchBar 
                    entries={itemData} 
                    currGuesses={currGuesses} 
                    guessedCorrectly={guessedCorrectly}
                    onSubmitCallback={appendGuess}
                />
            </div>
            {currGuesses.map((currGuess, index) => {
                return (
                    <SingularGuess
                        key={`${currGuess.name}`}
                        guess={currGuess}
                        actual={correctAnswer}
                    />
                )
            })}
        </div>
    )
}

export default RedText