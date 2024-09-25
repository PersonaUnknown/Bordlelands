import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
// Models
import { SettingsContext } from "../components/Modals/SettingsContext"
import { Entry, getWeapons } from "../models/fileLoader"
import { getRandomEntry } from "../models/rng"
import { ClassicGuess } from "../models/guess"
// Static UI
import NavigationBar from "../components/Navigation/NavigationBar"
import { ImSpinner8 } from "react-icons/im";
// Searches
import SearchBar from "../components/Guesses/SearchBar"
import GuessHeader from "../components/Guesses/GuessHeader"
import GuessTab from "../components/Guesses/GuessTab"
// Modals
import Hints from "../components/Guesses/Hints"
import SettingsModal from "../components/Modals/SettingsModal"
import TutorialModal from "../components/Modals/TutorialModal"
import VictoryModal from "../components/Modals/VictoryModal"
const LootPool = () => {
    // States
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
    const [showTutorialModal, setShowTutorialModal] = useState<boolean>(false)
    const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false)
    const [currGuesses, setCurrGuesses] = useState<ClassicGuess[]>([])
    const [dataLoaded, setDataLoaded] = useState<boolean>(false)
    const [itemData, setItemData] = useState<Entry[]>([])
    const [correctAnswer, setCorrectAnswer] = useState<Entry | null>(null)
    const [guessedCorrectly, setGuessedCorrectly] = useState<boolean>(false)
    const headerLabels = [
        "Item",         // Name 
        "Type",         // Gun, Shield, Grenade, COM, etc. 
        "Company",      // Manufacturer Company 
        "Rarity",       // Rarity
        "Element(s)",   // What elements can this item spawn with?
        "Drop Type",    // How do you obtain this item?
        "Theme",        // If the item is related to an NPC
        "Effect",       // A List of Special Effect Keywords For This Item
        "Game"          // What game is this one from?
    ]
    const appendGuess = (newEntry: Entry) => {
        let parsedNewEntry: string = JSON.stringify(newEntry)
        let parsedAnswer: string = JSON.stringify(correctAnswer)
        if (parsedNewEntry === parsedAnswer) {
            setTimeout(() => {
                handleShowVictory()
            }, 4500)
            setGuessedCorrectly(true)
            localStorage.setItem("guessedClassicCorrectly", "true")
        }
        let newCurrGuess: ClassicGuess = { guess: newEntry, loadOnStart: true }
        let oldGuesses: ClassicGuess[] = currGuesses
        if (oldGuesses.length > 0) {
            oldGuesses[0].loadOnStart = false
        }
        let newGuesses: ClassicGuess[] = [newCurrGuess, ...oldGuesses]
        localStorage.setItem("currClassicGuesses", JSON.stringify(newGuesses))
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
        localStorage.removeItem("currClassicGuesses")
        localStorage.removeItem("randomEntry")
        localStorage.removeItem("oldWeaponsSettings")
        localStorage.removeItem("guessedClassicCorrectly")
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
            let itemCheck = localStorage.getItem("randomEntry")
            if (itemCheck !== null) {
                let oldRandomEntry: Entry = JSON.parse(itemCheck)
                let oldCurrGuesses: ClassicGuess[] = JSON.parse(localStorage.getItem("currClassicGuesses") ?? "[]")
                for (let i = 0; i < oldCurrGuesses.length; i++) {
                    oldCurrGuesses[i].loadOnStart = false
                }
                let oldWeaponsSettings: string[] = JSON.parse(localStorage.getItem("oldWeaponsSettings") ?? `["borderlands-1", "borderlands-2", "borderlands-3", "borderlands-tps", "wonderlands"]`)
                let oldFetchedData = getWeapons(oldWeaponsSettings)
                // Check guessed correctly
                let correctGuessCheck: boolean = JSON.parse(localStorage.getItem("guessedClassicCorrectly") ?? "false")
                setGuessedCorrectly(correctGuessCheck)
                // console.log(oldRandomEntry)
                setCurrGuesses(oldCurrGuesses)
                setCorrectAnswer(oldRandomEntry)
                setItemData(oldFetchedData)
                setDataLoaded(true)
                return
            }
            let validWeapons = fetchValidWeapons()
            let fetchedData = getWeapons(validWeapons)
            let randomEntry = getRandomEntry(fetchedData)
            // console.log(randomEntry)
            setCorrectAnswer(randomEntry)
            setItemData(fetchedData)
            setDataLoaded(true)
            localStorage.setItem("currClassicGuesses", JSON.stringify([]))
            localStorage.setItem("randomEntry", JSON.stringify(randomEntry))
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
            <SettingsModal show={showSettingsModal} handleClose={handleCloseSettings}/>
            <TutorialModal show={showTutorialModal} handleClose={handleCloseTutorial}/>
            <VictoryModal show={showVictoryModal} name={correctAnswer.name} handleClose={handleCloseVictory}/>
            <NavigationBar
                handleSettingsShow={handleShowSettings}
                handleReroll={rerollItem}
                handleTutorialShow={handleShowTutorial}
            />
            <Hints answer={correctAnswer} numGuesses={currGuesses.length} answeredCorrectly={guessedCorrectly}/>
            <div className="flex flex-column center-horizontal margin-bottom">
                <span className="common" style={classicStyle}>
                    Start by guessing any item!
                </span>
                <SearchBar 
                    entries={itemData} 
                    currGuesses={currGuesses.map(entry => entry.guess)} 
                    guessedCorrectly={guessedCorrectly}
                    onSubmitCallback={appendGuess}
                />
            </div>
            <div className="flex flex-column" style={columnStyle}>
                <GuessHeader labels={headerLabels}/>
                { 
                    currGuesses.map((currGuess) => {
                        return (
                            <GuessTab
                                key={`${currGuess.guess.name}-${currGuess.guess.rarity}-${currGuess.guess.game}`}
                                guess={currGuess.guess}
                                actual={correctAnswer}
                                initState={currGuess.loadOnStart}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LootPool