// Weapons
import borderlandsWeapons from '../data/weapons/borderlands-1-weapons.json'
import borderlands2Weapons from '../data/weapons/borderlands-2-weapons.json'
import borderlands3Weapons from '../data/weapons/borderlands-3-weapons.json'
import borderlandsTPSWeapons from '../data/weapons/borderlands-tps-weapons.json'
import wonderlandsWeapons from '../data/weapons/wonderlands-weapons.json'

// Shields
// import borderlandsShields from '../data/shields/borderlands-1-shields.json'
// import borderlands2Shields from '../data/shields/borderlands-2-shields.json'
// import borderlands3Shields from '../data/shields/borderlands-3-shields.json'
// import borderlandsTPSShields from '../data/shields/borderlands-tps-shields.json'
// import wonderlandsShields from '../data/shields/wonderlands-shields.json'

// Grenades
// import borderlandsGrenades from '../data/grenades/borderlands-1-grenades.json'
// import borderlands2Grenades from '../data/grenades/borderlands-2-grenades.json'
// import borderlands3Grenades from '../data/grenades/borderlands-3-grenades.json'
// import borderlandsTPSGrenades from '../data/grenades/borderlands-tps-grenades.json'
// import wonderlandsSpells from '../data/grenades/wonderlands-spell.json'

// Class Mods
// import borderlandsCOM from '../data/class-mod/borderlands-1-class-mod.json'
// import borderlands2COM from '../data/class-mod/borderlands-2-class-mod.json'
// import borderlands3COM from '../data/class-mod/borderlands-3-class-mod.json'
// import borderlandsTPSCOM from '../data/class-mod/borderlands-tps-class-mod.json'
// import wonderlandsArmor from '../data/class-mod/wonderlands-class-mod.json'

// Relics / Artifacts / Oz-Kits / Rings and Amulets
// import relics from '../data/relifact-kits/borderlands-2-accessory.json'
// import artifacts from '../data/relifact-kits/borderlands-3-accessory.json'
// import ozKits from '../data/relifact-kits/borderlands-tps-accessory.json'
// import ringsAmulets from '../data/relifact-kits/wonderlands-rings-amulets.json'

const weapons = new Map<string, Entry[]>([
    ["borderlands-1", borderlandsWeapons],
    ["borderlands-2", borderlands2Weapons],
    ["borderlands-3", borderlands3Weapons],
    ["borderlands-tps", borderlandsTPSWeapons],
    ["wonderlands", wonderlandsWeapons]
])

export interface Entry {
    "name": string,
    "flavor-text": string,
    "game": string,
    "type": string,
    "manufacturer": string,
    "rarity": string,
    "image": string,
    "origin": string,
    "elements": string[],
    "drop-type": string,
    "drop-sources": string[]
}

export const getWeapons = (games: string[]) : Entry[] => {
    let output: Entry[] = []
    for (const game of games) {
        if (weapons.has(game)) {
            let newWeapons: Entry[] = weapons.get(game) ?? []
            output.push(...newWeapons)
        }
    }
    
    return output
}

export const getShields = () => {

}

export const getGrenades = () => {

}

export const getCOMs = () => {

}

export const getAccessories = () => {

}