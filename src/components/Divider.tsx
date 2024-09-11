const Divider = ({backgroundColor, height, borderRadius}: DividerProps) => {
    return (
        <div 
            style={{
                backgroundColor: backgroundColor ?? '#ffffff', 
                height: height ?? 5,
                borderRadius: borderRadius ?? 0
            }}
        />
    )
}
interface DividerProps {
    backgroundColor?: string,
    height?: string | number,
    borderRadius?: string | number
}

export default Divider