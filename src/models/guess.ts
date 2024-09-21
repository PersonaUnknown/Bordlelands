import { Entry, RedTextEntry } from "./fileLoader"
export interface Guess {
    gun: string,
    type: string,
    company: string,
    rarity: string,
    game: string
}

export interface ClassicGuess {
    guess: Entry,
    loadOnStart: boolean
}

export interface SingleGuess {
    guess: RedTextEntry,
    loadOnStart: boolean
}