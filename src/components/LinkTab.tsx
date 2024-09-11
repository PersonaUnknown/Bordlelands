import { Link } from "react-router-dom"
import Tab from '../images/tab.png'
const LinkTab = ({label, description, route, imgSrc}: LinkTabProps) => {
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
                style={{
                    position: 'absolute',
                    top: 30,
                    left: 5,
                    width: 70,
                    height: 60
                }}
                src={imgSrc}
            />
            <span 
                style={{
                    top: 32,
                    bottom: 0,
                    left: 95,
                    right: 0,
                    color: 'white',
                    fontSize: 26,
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {label} 
                <span
                    style={{
                        fontSize: 18
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