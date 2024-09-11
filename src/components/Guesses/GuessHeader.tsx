import Divider from "../Divider"
const GuessHeader = ({labels}: GuessHeaderProps) => {
    const Section = ({label}: SectionProps) => {
        const headerStyle = {
            width: 85
        }
        const sectionStyle = {
            color: 'white',
            fontFamily: 'Montserrat',
            fontSize: '1em',
            marginBottom: 5
        }
        return (
            <div style={headerStyle}>
                <span style={sectionStyle}>
                    {label}
                </span>
                <Divider height={5} backgroundColor="#ffffff" borderRadius={0}/>
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