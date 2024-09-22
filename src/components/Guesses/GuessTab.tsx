import { memo, useState, useEffect } from "react"
import { Entry } from "../../models/fileLoader"
import { getRarityColor, getColor, getColorComparison } from "../../models/colors"
import { getGameImage, getElementIcon } from "../../models/gameParser"
import { motion } from "framer-motion"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const GuessTab = ({guess, actual, initState}: GuessTabProps) => {
    const animDuration = initState ? 0.5 : 0
    const Guess = ({label, type, actual, animDuration, animDelay}: GuessProps) => {
        const GuessStyle = {
            width: 87.5,
            height: 87.5,
            borderRadius: 20,
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: 4,
            fontSize: 14,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowWrap: 'anywhere' as const,
            overflow: 'hidden',
            opacity: initState ? 0 : 1
        }
        const fadeAnimation = {
            opacity: 1
        }
        const fadeTransition = {
            ease: "easeOut",
            duration: animDuration,
            delay: animDelay
        }
        switch (type) {
            case "item":
                const itemStyle = {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain' as const,
                    backgroundColor: getRarityColor(guess.rarity)
                }
                const tooltipStyle = {
                    color: '#ffffff', 
                    backgroundColor: '#102332', 
                    border: '2px solid #1d9dff', 
                    position:"fixed" as const,
                    borderRadius: 10, 
                    padding: 10, 
                    fontSize: 18
                }
                return (
                    <OverlayTrigger
                        placement='left'
                        overlay={
                            <Tooltip className="font-montserrat" style={tooltipStyle}> 
                                {guess.name}
                            </Tooltip>
                        }
                        >
                        <motion.div style={GuessStyle} animate={fadeAnimation} transition={fadeTransition}>
                            <img
                                style={itemStyle}
                                src={guess.image}
                                alt='item'
                            />
                        </motion.div>
                    </OverlayTrigger>
                )
            case "text":
                return (
                    <motion.div 
                        style={{...GuessStyle, backgroundColor: getColor(label[0] === actual[0])}} 
                        animate={fadeAnimation} 
                        transition={fadeTransition}
                    >
                        {label[0]}
                    </motion.div>
                )
            case "game":
                const gameStyle = {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain' as const,
                    backgroundColor: getColor(label[0] === actual[0])
                }
                return (
                    <motion.div style={GuessStyle} animate={fadeAnimation} transition={fadeTransition}>
                        <img
                            style={gameStyle}
                            src={getGameImage(label[0])}
                            alt='game'
                        />
                    </motion.div>
                )
            case "effects":
                const effects: string = Array.isArray(label) ? label.join(", ") : label
                const fontStyle = { fontSize: 12 }
                return (
                    <motion.div 
                        style={{
                            ...GuessStyle, 
                            ...fontStyle,
                            backgroundColor: getColorComparison(label, actual),
                            flexWrap: 'wrap',
                            gap: 2
                        }}
                        animate={fadeAnimation} 
                        transition={fadeTransition}
                    >
                        {effects}
                    </motion.div>
                )
            default:
                // Element
                const elementStyle = {
                    width: 22,
                    height: 22
                }
                return (
                    <motion.div 
                        style={{
                            ...GuessStyle, 
                            backgroundColor: getColorComparison(label, actual),
                            flexWrap: 'wrap',
                            gap: 2
                        }}
                        animate={fadeAnimation} 
                        transition={fadeTransition}
                    >
                        {
                            label.map(element => {
                                return (
                                    <img
                                        key={element}
                                        alt={element}
                                        style={elementStyle}
                                        src={getElementIcon(element)}
                                    />
                                )
                            })
                        }
                    </motion.div>
                )
        }
    }

    return (
        <div className="flex flex-row" style={{gap: 7}}>
            <Guess label={[guess.name]} type={'item'} actual={[""]} animDelay={0} animDuration={initState ? 0.75 : 0}/>
            <Guess label={[guess.type]} type={'text'} actual={[actual.type]} animDelay={1 * animDuration} animDuration={animDuration}/>
            <Guess label={[guess.manufacturer]} type={'text'} actual={[actual.manufacturer]} animDelay={2 * animDuration} animDuration={animDuration}/>
            <Guess label={[guess.rarity]} type={'text'} actual={[actual.rarity]} animDelay={3 * animDuration} animDuration={animDuration}/>
            <Guess label={guess.elements} type={'element'} actual={actual.elements} animDelay={4 * animDuration} animDuration={animDuration}/>
            <Guess label={[guess["drop-type"]]} type={'text'} actual={[actual["drop-type"]]} animDelay={5 * animDuration} animDuration={animDuration}/>
            <Guess label={[guess["aftermarket"]]} type={'text'} actual={[actual["aftermarket"]]} animDelay={6 * animDuration} animDuration={animDuration}/>
            <Guess label={guess["effects"]} type={'effects'} actual={actual["effects"]} animDelay={7 * animDuration} animDuration={animDuration}/>
            <Guess label={[guess.game]} type={'game'} actual={[actual.game]} animDelay={8 * animDuration} animDuration={animDuration}/>
        </div>
    )
}
interface GuessProps {
    label: string[],
    type: string,
    actual: string[],
    animDuration: number,
    animDelay: number
}
interface GuessTabProps {
    guess: Entry,
    actual: Entry,
    initState: boolean
}
export default memo(GuessTab)