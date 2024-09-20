import Borderlands from '../images/borderlands.png'
import Borderlands2 from '../images/borderlands_2.png'
import Borderlands3 from '../images/borderlands_3.png'
import Wonderlands from '../images/wonderlands.png'
import PreSequel from '../images/pre_sequel.png'
export const getGameImage = (game: string) => {
    switch (game) {
        case "borderlands-1":
            // https://www.pinterest.com/pin/caerbaergamingcom--2603712279350961/
            return Borderlands
        case "borderlands-2":
            // Taken from r/Borderlands2
            return Borderlands2
        case "borderlands-3":
            // https://www.steamgriddb.com/icon/16254
            // By BigHungryChicken
            return Borderlands3
        case "wonderlands":
            // https://www.steamgriddb.com/icon/33095
            // By LutzPS
            return Wonderlands
        case "borderlands-tps":
            return PreSequel
        default:
            return Borderlands
    }
}

export const getGameName = (game: string) => {
    switch (game) {
        case "borderlands-1":
            return "Borderlands"
        case "borderlands-2":
            return "Borderlands 2"
        case "borderlands-3":
            return "Borderlands 3"
        case "wonderlands":
            return "Wonderlands"
        case "borderlands-tps":
            return "Borderlands: The Pre-Sequel"
        default:
            return "Borderlands"
    }
}

export const getElementIcon = (element: string) : string => {
    switch (element) {
        case "Non-Elemental":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a10849e5448ce2ca_Nonelemental.svg"
        case "Fire":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a1084939898ce2ce_Incindiary.svg"
        case "Corrosive":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/6234621bd868059ed12368de_Corrosive.svg"
        case "Poison":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/6250a1df43296632e1b30294_Poison.svg"
        case "Shock":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a108495e258ce2cc_Shock.svg"
        case "Lightning":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a108495e258ce2cc_Shock.svg"
        case "Frost":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a108491e628ce2c5_Cryo.svg"
        case "Cryo":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a108491e628ce2c5_Cryo.svg"
        case "Dark Magic":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/6250a1deeabedf7585ee4124_Dark%20Magic.svg"
        case "Explosive":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a1084982ae8ce2c2_Explosive.svg"
        case "Radiation":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a108494dff8ce2c6_Radiation.svg"
        case "Slag":
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/64787b9464e47abe94fd2cb3_Slag.svg"
        default:
            return "https://cdn.prod.website-files.com/5ff36780a108495c598ce192/5ff36780a10849e5448ce2ca_Nonelemental.svg"
    }
}