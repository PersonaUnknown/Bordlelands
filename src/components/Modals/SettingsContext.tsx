import { createContext, useState, useEffect } from "react"
const defaultValues = [true, true, true, true, true]
export interface SettingsContextContent {
    weaponsSettings: boolean[],
    setWeaponsSettings: React.Dispatch<React.SetStateAction<boolean[]>>,
    adjustWeaponsSettings: (index: number) => void
}
export const SettingsContext = createContext<SettingsContextContent>({
    weaponsSettings: defaultValues,
    setWeaponsSettings: () => {},
    adjustWeaponsSettings: () => {}
})
export default function SettingsProvider({children}: SettingsProviderProps) {
    const [weaponsSettings, setWeaponsSettings] = useState<boolean[]>([])
    const adjustWeaponsSettings = (index: number) => {
        let newSettings = weaponsSettings
        newSettings[index] = !newSettings[index]
        setWeaponsSettings(newSettings)
        localStorage.setItem("weaponsSettings", JSON.stringify(newSettings))
    }
    useEffect(() => {
        let localStorageCheck = localStorage.getItem("weaponsSettings")
        if (localStorageCheck === null) {
            setWeaponsSettings([true, true, true, true, true])
            localStorage.setItem("weaponsSettings", JSON.stringify(defaultValues))
        } else {
            let loadWeaponsSettings: boolean[] = JSON.parse(localStorageCheck)
            setWeaponsSettings(loadWeaponsSettings)
        }
    }, [])
    return (
        <SettingsContext.Provider value={{weaponsSettings, setWeaponsSettings, adjustWeaponsSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}
interface SettingsProviderProps {
    children: React.ReactElement
}