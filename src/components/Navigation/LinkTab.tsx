import { Link } from "react-router-dom"
import Tab from '../../images/tab.png'
import useWindowDimensions from "../../models/windowDimensions"
const LinkTab = ({label, description, route, imgSrc}: LinkTabProps) => {
    const { width } = useWindowDimensions()
    return (
        <Link 
            to={`/${route}`}
            className="hover-expand font-montserrat" 
            style={{ 
                textDecoration: 'none', 
                color: 'black', 
                position: 'relative'
            }}
        >
            <img 
                alt='tab' 
                src={Tab} 
                className="tab-img"
            />
            <img
                alt='icon'
                style={ 
                    width > 600 ?
                    {
                        position: 'absolute',
                        top: 30,
                        left: 5,
                        width: 70,
                        height: 60
                    } :
                    {
                        position: 'absolute',
                        top: 25,
                        left: 5,
                        width: 60,
                        height: 60
                    }
                }
                src={imgSrc}
            />
            <span 
                style={
                    width > 600 ?
                    {
                        top: 32,
                        bottom: 0,
                        left: 95,
                        right: 0,
                        color: 'white',
                        fontSize: 26,
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column'
                    } :
                    {
                        top: 24,
                        bottom: 0,
                        left: 75,
                        right: 0,
                        color: 'white',
                        fontSize: 20,
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }
            >
                {label} 
                <span
                    style={{
                        fontSize: width > 600 ? 18 : 16
                    }}
                >
                    {description}
                </span>
            </span>
        </Link>
    )
}

interface LinkTabProps {
    label: string,
    description: string,
    route: string,
    imgSrc: string
}
export default LinkTab