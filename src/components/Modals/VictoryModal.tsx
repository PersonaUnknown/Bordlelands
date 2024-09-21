import { Modal } from "react-bootstrap"
import { motion } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
const VictoryModal = ({show, name, handleClose}: VictoryModalProps) => {
    // Styles
    const modalStyle = {
        backgroundColor: '#3f3f3f',
        color: '#ffffff',
        fontFamily: 'Montserrat'
    }
    const buttonStyle = {
        backgroundColor: '#3f3f3f',
        borderColor: 'transparent',
        marginLeft: 'auto'
    }
    // Render
    return (
        <Modal
          show={show}
          onHide={handleClose}
          centered
        >
            <Modal.Header style={{...modalStyle, display: 'flex', flexDirection: 'column'}}>
                <motion.button style={buttonStyle} onClick={handleClose} whileHover={{scale: 1.1}}>
                    <FaWindowClose color='#ffffff' style={{width: 30, height: 30}}/>
                </motion.button>
                Congratulations!
            </Modal.Header>
            <Modal.Body style={modalStyle}>
                You have correctly guessed the item: {name} <br></br>
                Feel free to try out other modes or re-roll to test yourself further. 
            </Modal.Body>
        </Modal>
    )
}
interface VictoryModalProps {
    show: boolean,
    name: string,
    handleClose: () => void,
}
export default VictoryModal