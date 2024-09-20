export const getColor = (state: boolean): string => {
    if (state) {
        return "#45f395"
    } else {
        return "#f36445"
    }
}

export const getColorComparison = (guess: string[], actual: string[]): string => {
    let partialMatch: boolean = false
    let sortedGuess: string[] = guess.sort()
    let sortedActual: string[] = actual.sort()
    if (sortedGuess.join(",") === sortedActual.join(",")) {
        return "#45f395"
    }
    for (const input of sortedGuess) {
        if (sortedActual.includes(input)) {
            partialMatch = true
            break
        }
    }
    if (!partialMatch) {
        return "#f36445"
    } else {
        return "#df8711"
    }
}

export const getRarityColor = (rarity: string): string => {
    switch (rarity) {
        case "Common":
            return "#ffffff"
        case "Uncommon":
            return "#76F44B"
        case "Rare":
            return "#28a6ff"
        case "Epic":
            return "#d07bff"
        case "Legendary":
            return "#ffc338"
        case "Effervescent":
            return "#ff7570"
        case "E-Tech":
            return "#ff5cec"
        case "Seraph":
            return "#ff99c8"
        case "Pearlescent":
            return "#4df2f2"
        case "Glitch":
            return "#ff99c8"
        default: 
            return "#ffffff"
    }
}