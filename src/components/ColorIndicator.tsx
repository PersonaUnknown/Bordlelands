const ColorIndicator = () => {
    const containerStyle = {
        marginTop: 15,
        marginBottom: 0,
        backgroundColor: '#3f3f3f',
        borderRadius: 10,
        color: 'white',
        fontSize: 24
    }
    const iconStyle = {
        width: 25,
        height: 25,
        margin: 'auto'
    }
    const Indicator = ({label, backgroundColor}: IndicatorProps) => {
        return (
            <div className="flex flex-column">
                <div style={{...iconStyle, backgroundColor: backgroundColor}}/>
                <span> {label}</span>
            </div>
        )
    }
    return (
        <div className='flex flex-column' style={containerStyle}>
            <div className="flex flex-row center-horizontal" style={{gap: 15}}>
                <Indicator label="Correct" backgroundColor="#45f395"/>
                <Indicator label="Partial" backgroundColor="#df8711"/>
                <Indicator label="Incorrect" backgroundColor="#f36445"/>
            </div>
        </div>
    )
}

interface IndicatorProps {
    label: string,
    backgroundColor: string
}

export default ColorIndicator