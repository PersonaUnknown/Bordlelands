import { Entry } from "./fileLoader";

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const games = [
    "borderlands-1",
    "borderlands-2",
    "borderlands-3",
    "borderlands-tps",
    "wonderlands"
]

export const getRandomGame = () => {
    let length: number = games.length
    let randomIndex: number = getRandomInt(0, length - 1)
    if (randomIndex < 0 || randomIndex >= length) {
        console.error("An invalid index was given: " + randomIndex)
        return
    }

    return games[randomIndex]
}

export const getRandomEntry = (entries: Entry[]) : Entry | null => {
    let length: number = entries.length
    let randomIndex: number = getRandomInt(0, length - 1)
    if (randomIndex < 0 || randomIndex >= length) {
        console.error("An invalid index was given: " + randomIndex)
        return null
    }

    return entries[randomIndex]
}