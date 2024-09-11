import { IoMdSettings } from "react-icons/io";
import { FaRegQuestionCircle, FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const NavigationBar = ({handleSettingsShow, handleReroll, handleTutorialShow}: NavigationBarProps) => {
    const buttonStyle = {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    }
    const containerStyle = {
        backgroundColor: '#102332',
        border: '2px solid #1d9dff', 
        borderRadius: 10,
        marginLeft: '20%',
        marginRight: '20%',
        marginBottom: 15,
        justifyContent: 'space-evenly',
        padding: 5
    }
    const tooltipStyle = {
      color: '#ffffff', 
      backgroundColor: '#102332', 
      border: '2px solid #1d9dff', 
      position:"fixed" as const,
      borderRadius: 10, 
      padding: 10, 
      fontSize: 22
    }
    const OverlayToolTip = ({title, children}: OverlayToolTipProps) => {
      return (
        <OverlayTrigger
          placement="bottom" 
          overlay={
            <Tooltip className="font-montserrat" style={tooltipStyle}> 
              {title} 
            </Tooltip>
          }
        >
          {children}
        </OverlayTrigger>
      )
    }
    return (
      <div className='flex flex-row' style={containerStyle}>
        <OverlayToolTip 
          title="Settings"
          children={
            <motion.button
              style={buttonStyle}
              whileHover={{rotateZ: 30}}
              onClick={handleSettingsShow}
            >
              <IoMdSettings color='gray' style={{width: 35, height: 35}}/>
            </motion.button>
          }
        />
        <OverlayToolTip 
          title="Reroll Item"
          children={
            <motion.button
              style={buttonStyle}
              whileHover={{rotateZ: 360}}
              transition={{ease: 'easeIn', duration: 0.35}}
              onClick={handleReroll}
            >
              <FaRedo color='gray' style={{width: 30, height: 30}}/>
            </motion.button>
          }
        />
        <OverlayToolTip 
          title="How to Play?"
          children={
            <motion.button
              style={buttonStyle}
              whileHover={{rotateZ: -30}}
              onClick={handleTutorialShow}
            >
              <FaRegQuestionCircle color='gray' style={{width: 35, height: 35}}/>
            </motion.button>
          }
        />
      </div>
    )
}
interface OverlayToolTipProps {
  title: string,
  children: JSX.Element
}
interface NavigationBarProps {
  handleSettingsShow: () => void,
  handleReroll: () => void,
  handleTutorialShow: () => void
}
export default NavigationBar