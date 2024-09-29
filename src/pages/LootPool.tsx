import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
// Models
import { SettingsContext } from "../components/Modals/SettingsContext"
import { getGameName } from "../models/gameParser"
import { Entry, LootSource, getLootSources, getWeapons } from "../models/fileLoader"
import { ClassicGuess, LootGuess } from "../models/guess"
import { getRandomLootSource } from "../models/rng"
import useWindowDimensions from "../models/windowDimensions"
// Static UI
import NavigationBar from "../components/Navigation/NavigationBar"
import { ImSpinner8 } from "react-icons/im";
// Searches
import SearchBar from "../components/Guesses/SearchBar"
import LootSourceGuess from "../components/Guesses/LootSource/LootSourceGuess"
// Modals
import SettingsModal from "../components/Modals/SettingsModal"
import TutorialModal from "../components/Modals/TutorialModal"
import VictoryModal from "../components/Modals/VictoryModal"
const LootPool = () => {
    // States
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
    const [showTutorialModal, setShowTutorialModal] = useState<boolean>(false)
    const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false)
    const [currGuesses, setCurrGuesses] = useState<LootGuess[]>([])
    const [dataLoaded, setDataLoaded] = useState<boolean>(false)
    const [itemData, setItemData] = useState<Entry[]>([])
    const [currLootSource, setCurrentLootSource] = useState<LootSource | null>(null)
    const [guessedCorrectly, setGuessedCorrectly] = useState<boolean>(false)
    const { width } = useWindowDimensions()
    const appendGuess = (newEntry: Entry) => {
        if (currLootSource === null) {
            return
        }
        let newEntryLootSources: string[] = newEntry["drop-sources"]
        if (newEntryLootSources.includes(currLootSource.name)) {
            setTimeout(() => {
                handleShowVictory()
            }, 500)
            setGuessedCorrectly(true)
            localStorage.setItem("guessedLootSourceCorrectly", "true")
            // console.log("Guessed Correctly!")
        }
        let newCurrGuess: LootGuess = { guess: newEntry, loadOnStart: true }
        let oldGuesses: ClassicGuess[] = currGuesses
        if (oldGuesses.length > 0) {
            oldGuesses[0].loadOnStart = false
        }
        let newGuesses: LootGuess[] = [newCurrGuess, ...oldGuesses]
        localStorage.setItem("currLootSourceGuesses", JSON.stringify(newGuesses))
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
        localStorage.removeItem("currLootSourceGuesses")
        localStorage.removeItem("randomLootSourceEntry")
        localStorage.removeItem("oldWeaponsSettings")
        localStorage.removeItem("guessedLootSourceCorrectly")
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
            let itemCheck = localStorage.getItem("randomLootSourceEntry")
            if (itemCheck !== null) {
                let oldRandomEntry: LootSource = JSON.parse(itemCheck)
                let oldCurrGuesses: LootGuess[] = JSON.parse(localStorage.getItem("currLootSourceGuesses") ?? "[]")
                for (let i = 0; i < oldCurrGuesses.length; i++) {
                    oldCurrGuesses[i].loadOnStart = false
                }
                let oldWeaponsSettings: string[] = JSON.parse(localStorage.getItem("oldWeaponsSettings") ?? `["borderlands-1", "borderlands-2", "borderlands-3", "borderlands-tps", "wonderlands"]`)
                let fetchedWeapons: Entry[] = getWeapons(oldWeaponsSettings)
                // Check guessed correctly
                let correctGuessCheck: boolean = JSON.parse(localStorage.getItem("guessedLootSourceCorrectly") ?? "false")
                setGuessedCorrectly(correctGuessCheck)
                setCurrGuesses(oldCurrGuesses)
                setCurrentLootSource(oldRandomEntry)
                setItemData(fetchedWeapons)
                setDataLoaded(true)
                return
            }
            let validWeapons = fetchValidWeapons()
            let fetchedWeapons: Entry[] = getWeapons(validWeapons)
            let fetchedData: LootSource[] = getLootSources(validWeapons)
            let randomEntry = getRandomLootSource(fetchedData)
            setCurrentLootSource(randomEntry)
            setItemData(fetchedWeapons)
            setDataLoaded(true)
            localStorage.setItem("currLootSourceGuesses", JSON.stringify([]))
            localStorage.setItem("randomLootSourceEntry", JSON.stringify(randomEntry))
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
        fontSize: width > 600 ? 26 : 20,
        color: 'white',
        marginLeft: 25,
        marginRight: 25
    }
    // Rendering
    if (!dataLoaded || currLootSource === null) {
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
            <TutorialModal show={showTutorialModal} handleClose={handleCloseTutorial} tutorialMode="lootpool"/>
            <VictoryModal show={showVictoryModal} name={currGuesses.length === 0 ? "" : currGuesses[0].guess.name} handleClose={handleCloseVictory}/>
            <NavigationBar
                handleSettingsShow={handleShowSettings}
                handleReroll={rerollItem}
                handleTutorialShow={handleShowTutorial}
            />
            <div className="flex flex-column center-horizontal margin-bottom">
                <span className="common" style={classicStyle}>
                    What is any item that can drop from this loot source?
                </span>
                <img 
                    alt='source' 
                    src={currLootSource.image === "" ? 
                        "https://cdn.prod.website-files.com/5ff36780a1084987868ce198/65df04fa947339c4d497883a_Quest.svg" : 
                        currLootSource.image} 
                    style={{
                        width: width > 600 ? 400 : 280, 
                        height: 'auto',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                />
                <span className="common" style={classicStyle}> 
                    {currLootSource.name} ({getGameName(currLootSource.game)}) 
                </span>
                <SearchBar 
                    entries={itemData} 
                    currGuesses={currGuesses.map(entry => entry.guess)} 
                    guessedCorrectly={guessedCorrectly}
                    onSubmitCallback={appendGuess}
                />
            </div>
            {currGuesses.map((currGuess) => {
                return (
                    <LootSourceGuess
                        key={`${currGuess.guess.name}-${currGuess.guess.rarity}-${currGuess.guess.game}`}
                        guess={currGuess.guess}
                        actual={currLootSource}
                        loadOnStart={currGuess.loadOnStart}
                    />
                )
            })}
        </div>
    )
}

export default LootPool