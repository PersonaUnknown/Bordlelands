import { memo, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import { motion } from 'framer-motion'
import { FaWindowClose } from "react-icons/fa";
import { SettingsContext } from "./SettingsContext";
import Divider from "../UI/Divider";
const SettingsModal = ({show, handleClose}: SettingsModalProps) => {
    // States
    const { weaponsSettings, adjustWeaponsSettings } = useContext(SettingsContext)
    const games = [
        "Borderlands 1",
        "Borderlands 2",
        "Borderlands 3",
        "Borderlands: The Pre-Sequel",
        "Tiny Tina's Wonderlands"
    ]
    // Styles
    const modalStyle = {
        backgroundColor: '#3f3f3f',
        color: '#ffffff',
        fontFamily: 'Montserrat'
    }
    const titleStyle = {
        fontSize: 30
    }
    const buttonStyle = {
        backgroundColor: '#3f3f3f',
        borderColor: 'transparent',
        marginLeft: 'auto'
    }
    const formStyle = {
        marginBottom: 10
    }
    const formLabelStyle = {
        fontSize: 24,
    }
    // Render
    const renderCheckboxes = (states: boolean[], setState: (index: number) => void) => {
        return (
            games.map((game, index) => {
                return (
                    <Form.Check
                        key={game}
                        type='checkbox'
                        label={game}
                        defaultChecked={states[index]}
                        onClick={() => { setState(index) }}
                    />
                )
            })
        )
    }
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
                <Modal.Title style={titleStyle}>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalStyle}>
                <div style={formStyle}>
                    <span style={formLabelStyle}>
                        Guns / Melee Weapons
                    </span>
                    <Form>
                        { renderCheckboxes(weaponsSettings, adjustWeaponsSettings) }
                    </Form>
                </div>
                <Divider height={2}/>
            </Modal.Body>
        </Modal>
    );
}

export interface Settings {
    getWeaponsSettings: () => boolean[]
}

interface SettingsModalProps {
    show: boolean,
    handleClose: () => void,
}

export default memo(SettingsModal)