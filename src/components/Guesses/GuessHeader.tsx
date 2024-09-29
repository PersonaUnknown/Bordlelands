import Divider from "../UI/Divider"
import useWindowDimensions from "../../models/windowDimensions"
const GuessHeader = ({labels}: GuessHeaderProps) => {
    const { width } = useWindowDimensions()
    const Section = ({label}: SectionProps) => {
        const headerStyle = {
            width: width > 860 ? 85 : width > 600 ? 55 : width > 450 ? 35 : 25
        }
        const sectionStyle = {
            color: 'white',
            fontFamily: 'Montserrat',
            fontSize: width > 860 ? '1em' : width > 600 ? '0.65em' : width > 450 ? '0.425em' : '0.3em',
            marginBottom: 5
        }
        return (
            <div style={headerStyle}>
                <span style={sectionStyle}>
                    {label}
                </span>
                <Divider height={width > 600 ? 5 : 2} backgroundColor="#ffffff" borderRadius={0}/>
            </div>
        )
    }
    const gapStyle = {
        gap: 10
    }
    return (
        <div className="flex flex-row" style={gapStyle}>
            {labels.map(label => {
                return (
                    <Section label={label} key={label}/>
                )
            })}
        </div>
    )
}
interface SectionProps {
    label: string
}
interface GuessHeaderProps {
    labels: string[]
}

export default GuessHeader