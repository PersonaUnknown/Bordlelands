import Modal from 'react-bootstrap/Modal';
import { motion } from 'framer-motion';
import { FaWindowClose } from "react-icons/fa";
import ColorIndicator from '../ColorIndicator';
function TutorialModal({show, handleClose}: TutorialModalProps) {
  const modalStyle = {
    backgroundColor: '#3f3f3f',
    color: '#ffffff',
    fontFamily: 'Montserrat',
    borderRadius: 0
  }
  const titleStyle = {
      fontSize: 30,
      marginRight: 'auto'
  }
  const buttonStyle = {
    backgroundColor: '#3f3f3f',
    borderColor: 'transparent',
    marginLeft: 'auto'
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
        <Modal.Title style={titleStyle}>How to play?</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        Guess an item from Gearbox's game franchise "Borderlands". You can adjust which games 
        and types of items you want to guess from in settings. If you are having trouble guessing 
        the current item, feel free to re-roll a new item.
      </Modal.Body>
      <Modal.Header style={modalStyle}>
        <Modal.Title style={titleStyle}> Classic Mode</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        In classic mode, type the name of a Borderlands item and its properties will be shown.
        The color of the tiles determine how close each property is to the actual answer.
        <ColorIndicator/>
      </Modal.Body>
      <Modal.Header style={modalStyle}>
        <Modal.Title style={titleStyle}> Properties </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        Type
        <ul>
          <li>
            Possible values for guns / weapons: Assault Rifle, Eridian, E-Tech, Melee, Pistol, Revolver, Repeater, Rocket Launcher, Shotgun, Sniper, SMG
          </li>
          <li>
            Possible values for shields / wards: Absorb, Adaptive, Amplify, Booster, Damage, Heal, Nova, Reflect, Resistance, Roid, Rune, Spike, Standard, Turtle, Unique
          </li>
          <li>
            Possible values for grenades / spells: Area of Effect, Bouncing Betty, Channel, MIRV, Repeating, Self, Simple, Singularity, Standard, Transfusion, Unique
          </li>
        </ul>
        Company
        <ul>
          <li>
            Possible values for guns: Atlas, Bandit, Blackpowder, COV, DAHL, DAHLIA, Eridian, Feriore, Hyperion, Hyperius, Maliwan, Jakobs, Scav, Skuldugger, S&S Munitions, Stoker, Tediore, Torgue, Valora, Vladof
            Possible values for melee weapons: Bonk, Kleave, Swifft, Valora
            Possible values for shields (besides ones already listed): Anshin, Pangolin
          </li>
        </ul>
        Rarity
        <ul>
          <li>
            Possible values: Common, Uncommon, Rare, Epic, Legendary, Seraph, E-Tech, Glitch, Pearlescent, Effervescent
          </li>
        </ul>
        Element(s)
        <ul>
          <li>
            Possible values: Non-Elemental, Fire, Shock, Lightning, Corrosive, Poison, Cryo, Frost, Slag, Explosive, Dark Magic
          </li>
        </ul>
        Drop Type
        <ul>
          <li>
            Specifies if the item is a Dedicated Drop (Can only drop from that dedicated source), 
            World Drop (Can drop anywhere in the world but can also have a dedicated loot source), 
            Discoverable (Cannot drop anywhere and must be found), 
            or Unobtainable (Found through data-mining or cut content).
          </li>
        </ul>
        Game
        <ul>
          <li>
            Possible values: Borderlands 1, Borderlands 2, Borderlands: The Pre-Sequel, Borderlands 3, Tiny Tina's Wonderlands
          </li>
        </ul>
      </Modal.Body>
      <Modal.Header style={modalStyle}>
        <Modal.Title style={titleStyle}> Clues </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        Clues are unlocked after enough incorrect guesses. Even after you guess the item correctly, you can still access and look at its clues.
        <ul>
          <li>
            Flavor Text shows the red text of an item (if it has one).
          </li>
          <li>
            Loot Source reveals the loot source that has the item as a dedicated drop (if it exists)
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
}

interface TutorialModalProps {
  show: boolean,
  handleClose: () => void,
}

export default TutorialModal