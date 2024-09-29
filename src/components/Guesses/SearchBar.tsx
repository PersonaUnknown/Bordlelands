import { useState } from "react"
import { Entry } from "../../models/fileLoader"
import { getRarityColor } from "../../models/colors"
const SearchBar = ({entries, currGuesses, guessedCorrectly, onSubmitCallback}: SearchBarProps) => {
    const [currInput, setCurrInput] = useState<string>("")
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const onFocus = () => { 
        setIsFocused(true) 
    }
    const onBlur = () => { 
        setTimeout(() => {
            setIsFocused(false)
        }, 100) 
    }
    const onSubmit = () => {
        let filteredEntries = entries.filter(entry => {
            return filterCheck(entry)
        })
        if (filteredEntries.length > 0) {
            setCurrInput("")
            setIsFocused(false)
            onSubmitCallback(filteredEntries[0])
        }
    }
    const filterCheck = (entry: Entry) : boolean => {
        let searchQueryMatch: boolean = entry.name.toLowerCase().includes(currInput.toLowerCase())
        let currGuessCheck = true
        for (let i = 0; i < currGuesses.length; i++) {
            let entryCheck : Entry = currGuesses[i]
            if (entryCheck.name === entry.name && entryCheck.rarity === entry.rarity && entryCheck.game === entry.game) {
                // To deal with the edge cases of: 1) Returning legendaries, 2) The same unique listed at multiple rarities
                currGuessCheck = false
                break
            }
        }
        return searchQueryMatch && currGuessCheck
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && currInput.length > 0) {
            onSubmit()
        }
    }
    const renderTabs = () => {
        let filteredEntries = entries.filter(entry => {
            return filterCheck(entry)
        })
        const tabStyle = {
            padding: 10,
            gap: 10,
            width: '100%',
            backgroundColor: '#373737',
            border: '1px solid #1d9dff', 
            color: 'white',
            fontSize: 24
        }
        const imgStyle = {
            width: 130,
            height: 70,
            objectFit: 'contain' as const
        }
        return (
            filteredEntries.length <= 0 ?
            <div style={tabStyle}>
                No items found
            </div>
            :
            filteredEntries.map(entry => {
                const nameStyle = {
                    fontSize: 24,
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    color: getRarityColor(entry.rarity),
                    flex: 1
                }
                return (
                    <button 
                        style={tabStyle}
                        className="flex flex-row"
                        key={`${entry.name}-${entry.game}-${entry.rarity}-${entry["flavor-text"]}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            setCurrInput("")
                            setIsFocused(false)
                            onSubmitCallback(entry)
                        }}
                    >
                        <div style={{width: '50%', margin: 'auto'}}>
                            <img alt='item-img' src={entry.image} style={imgStyle}/>
                        </div>
                        <span style={nameStyle}>
                            { entry.name}
                        </span>
                    </button>
                )
            })
        )
    }
    return (
        <div>
            <input 
                type="text" 
                placeholder="EX: Gub"
                value={currInput}
                disabled={guessedCorrectly}
                onChange={e => {
                    if (e.target.value.length > 0) {
                        setIsFocused(true)
                    }
                    setCurrInput(e.target.value)
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                onSubmit={onSubmit}
                onKeyDown={handleKeyDown}
                style={{
                    fontSize: 26,
                    borderRadius: 25,
                    padding: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: '#102332', 
                    border: '2px solid #1d9dff', 
                    width: 400,
                    color: 'white',
                    outline: 'none'
                }}
            />
            { 
                isFocused && currInput.length > 0 && 
                <div
                    style={{
                        backgroundColor: '#373737',
                        maxHeight: 350,
                        width: 410,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        marginInline: 'auto', 
                        zIndex: 10
                    }}
                >
                    { renderTabs() }
                </div>
            }
        </div>
    )
}

interface SearchBarProps {
    entries: Entry[],
    currGuesses: Entry[],
    guessedCorrectly: boolean,
    onSubmitCallback: (newEntry: Entry) => void
}

export default SearchBar