// Weapons
import { 
    borderlandsWeapons,
    borderlands2Weapons,
    borderlands3Weapons,
    borderlandsTPSWeapons,
    wonderlandsWeapons
} from '../data/js/weapons'

// import borderlandsWeapons from '../data/weapons/borderlands-1-weapons.json'
// import borderlands2Weapons from '../data/weapons/borderlands-2-weapons.json'
// import borderlands3Weapons from '../data/weapons/borderlands-3-weapons.json'
// import borderlandsTPSWeapons from '../data/weapons/borderlands-tps-weapons.json'
// import wonderlandsWeapons from '../data/weapons/wonderlands-weapons.json'

// Loot Sources (Weapons)
import { 
    borderlandsLoot,
    borderlands2Loot,
    borderlands3Loot,
    borderlandsTPSLoot,
    wonderlandsLoot 
} from '../data/js/lootsources'

// import borderlandsLoot from '../data/loot-sources/borderlands-1-named-enemies.json'
// import borderlands2Loot from '../data/loot-sources/borderlands-2-named-enemies.json'
// import borderlands3Loot from '../data/loot-sources/borderlands-3-named-enemies.json'
// import borderlandsTPSLoot from '../data/loot-sources/borderlands-tps-named-enemies.json'
// import wonderlandsLoot from '../data/loot-sources/wonderlands-named-enemies.json'

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

const loot = new Map<string, LootSource[]>([
    ["borderlands-1", borderlandsLoot],
    ["borderlands-2", borderlands2Loot],
    ["borderlands-3", borderlands3Loot],
    ["borderlands-tps", borderlandsTPSLoot],
    ["wonderlands", wonderlandsLoot]
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
    "drop-sources": string[],
    "aftermarket": string,
    "effects": string[]
}

export interface RedTextEntry {
    "name": string,
    "flavor-text": string,
    "image": string,
    "rarities": string[],
    "type": string[],
    "manufacturers": string[],
    "drop-sources": string[]
}

export interface LootSource {
    "name": string,
    "game": string,
    "location": string,
    "status": string,
    "image": string
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

export const getFlavorTexts = (games: string[]) : RedTextEntry[] => {
    let flavorTexts = new Map<string, RedTextEntry>()
    for (const game of games) {
        if (weapons.has(game)) {
            let newWeapons: Entry[] = weapons.get(game) ?? []
            for (const weapon of newWeapons) {
                if (flavorTexts.has(weapon['flavor-text'])) {
                    let oldEntry: RedTextEntry | undefined = flavorTexts.get(weapon['flavor-text'])
                    if (oldEntry === undefined) {
                        continue
                    }
                    if (!oldEntry.type.includes(weapon.type)) {
                        oldEntry.type = [...oldEntry.type, weapon.type]
                    }
                    if (!oldEntry.manufacturers.includes(weapon.manufacturer)) {
                        oldEntry.manufacturers = [...oldEntry.manufacturers, weapon.manufacturer]
                    }
                    oldEntry['drop-sources'] = [...oldEntry['drop-sources'], ...weapon['drop-sources']]
                    oldEntry['drop-sources'] = [...new Set(oldEntry['drop-sources'])]
                    oldEntry['rarities'] = [...oldEntry['rarities'], ...weapon.rarity]
                    oldEntry['rarities'] = [...new Set(oldEntry['rarities'])]
                    flavorTexts.set(weapon['flavor-text'], oldEntry)
                } else {
                    let newEntry: RedTextEntry = {
                        "name": weapon.name,
                        "flavor-text": weapon['flavor-text'],
                        "type": [weapon.type],
                        "manufacturers": [weapon.manufacturer],
                        "drop-sources": weapon['drop-sources'],
                        "image": weapon.image,
                        "rarities": [weapon.rarity]
                    }
                    flavorTexts.set(weapon['flavor-text'], newEntry)
                }
            }
        }
    }
    
    return Array.from(flavorTexts.values())
}

export const getLootSources = (games: string[]) : LootSource[] => {
    let output: LootSource[] = []
    for (const game of games) {
        if (weapons.has(game)) {
            let newLoot: LootSource[] = loot.get(game) ?? []
            output.push(...newLoot)
        }
    }
    
    return output
}

export const getNamedEnemies = () => {
    
}

export const getShields = () => {

}

export const getGrenades = () => {

}

export const getCOMs = () => {

}

export const getAccessories = () => {

}