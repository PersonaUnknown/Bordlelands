import Modal from 'react-bootstrap/Modal';
import { motion } from 'framer-motion';
import { FaWindowClose } from "react-icons/fa";
import ColorIndicator from '../UI/ColorIndicator';
function TutorialModal({show, handleClose, tutorialMode}: TutorialModalProps) {
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
  const RenderTutorial = () => {
    switch (tutorialMode) {
      case "redtext":
        return (
          <>
            <Modal.Header style={modalStyle}>
              <Modal.Title style={titleStyle}> Flavor Text Mode</Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalStyle}>
              In this mode, you have to guess the name of an item based on the given
              flavor text for it.
            </Modal.Body>
            <Modal.Header style={modalStyle}>
              <Modal.Title style={titleStyle}> Clues </Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalStyle}>
              Clues are unlocked after enough incorrect guesses. Even after you guess the item correctly, you can still access and look at its clues.
              <ul>
                <li>
                  Item Type shows what type of item it is (Pistol, Shotgun, etc.)
                </li>
                <li>
                  Drop Origin reveals the loot source that has the item as a dedicated drop (if it exists)
                </li>
              </ul>
            </Modal.Body>
          </>
        )
      case "image":
        return (
          <>
            <Modal.Header style={modalStyle}>
              <Modal.Title style={titleStyle}> Image Mode</Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalStyle}>
              In this mode, you have to guess the name of an item based on a blurry image of it.
              Incorrect guesses unblur the image slightly. You can toggle this feature off at any time.
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
                  Drop Origin reveals the loot source that has the item as a dedicated drop (if it exists)
                </li>
              </ul>
            </Modal.Body>
          </>
        )
      case "lootpool":
        return (
          <>
            <Modal.Header style={modalStyle}>
              <Modal.Title style={titleStyle}> Loot Pool Mode</Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalStyle}>
              In this mode, you are given the name and image of a loot source that has a higher chance
              of dropping a specific unique item (or multiple). Your job is to just guess ANY item that is in
              its loot pools. It is made clear if the loot source is an: Enemy, Quest, Discoverable, or Challenge.
            </Modal.Body>
          </>
        )
      default:
        return (
          <>
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
              Type: What kind of item it is
              <ul>
                <li>
                  Possible values: Assault Rifle, Eridian, E-Tech, Melee, Pistol, Revolver, Repeater, Rocket Launcher, Shotgun, Sniper, SMG
                </li>
                {/* <li>
                  Possible values for shields / wards: Absorb, Adaptive, Amplify, Booster, Damage, Heal, Nova, Reflect, Resistance, Roid, Rune, Spike, Standard, Turtle, Unique
                </li>
                <li>
                  Possible values for grenades / spells: Area of Effect, Bouncing Betty, Channel, MIRV, Repeating, Self, Simple, Singularity, Standard, Transfusion, Unique
                </li> */}
              </ul>
              Company: What manufacturer made it
              <ul>
                <li>
                  Possible values for guns: Atlas, Bandit, Blackpowder, COV, DAHL, DAHLIA, Eridian, Feriore, Hyperion, Hyperius, Maliwan, Jakobs, Scav, Skuldugger, S&S Munitions, Stoker, Tediore, Torgue, Valora, Vladof
                  Possible values for melee weapons: Bonk, Kleave, Swifft, Valora
                  {/* Possible values for shields (besides ones already listed): Anshin, Pangolin */}
                </li>
              </ul>
              Rarity: What rarity does it spawn as
              <ul>
                <li>
                  Possible values: Common, Uncommon, Rare, Epic, Legendary, Seraph, E-Tech, Glitch, Pearlescent, Effervescent
                </li>
              </ul>
              Element(s): What element(s) it spawns with
              <ul>
                <li>
                  Possible values: Non-Elemental, Fire, Shock, Lightning, Corrosive, Poison, Cryo, Frost, Slag, Explosive, Dark Magic
                </li>
              </ul>
              Drop Type: How this item drops in the loot pool
              <ul>
                <li>
                  Dedicated Drop (Can only drop from that dedicated source / quest), 
                </li>
                <li>
                  World Drop (Can drop anywhere in the world but can also have a dedicated loot source)
                </li>
                <li>
                  Discoverable (Cannot drop anywhere and must be found)
                </li>
                <li>
                  Unobtainable (Found through data-mining or cut content)
                </li>
              </ul>
              Theme: If the item is related to an NPC or aesthetic 
              <ul>
                <li>
                  Examples would be Moxxi, Hammerlock, Tiny Tina, or Captain Blade weapons from Borderlands 2
                </li>
                <li>
                  Some themes are exclusive to one item like the Ajax's Spear (Borderlands 1) belongs to Ajax (a known character)
                </li>
              </ul>
              Effects: What basic effect does the item do
              <ul>
                <li>
                  Effects are broken into keywords that try to encapsulate multiple effects into one word
                </li>
                <li>
                  Stats: Effect related to stat bonuses (i.e. above average compared to non-unique in some way or temporary stat buffs)
                </li>
                <li>
                  Projectile: Effect related to the projectile (unique projectile, projectile count, projectile behavior, etc.)
                </li>
                <li>
                  Fire Pattern: Effect related to how the gun shoots out projectiles (EX: Heartbreaker shooting in the pattern of a heart)
                </li>
                <li>
                  Firing Mode: Effect related to an alternate firing mode if from Borderlands 3 / Wonderlands or shoots differently
                </li>
                <li>
                  Element: Effect related to spawning only with a single element (or none if that is the impressive part)
                </li>
                <li>
                  Movement: Effect related to moving
                </li>
                <li>
                  Shield: Effect related to shield (whether it refers to the user's shield or something else)
                </li>
                <li>
                  Cursed: Effect related to some negative drawback that's part of the item's identity
                </li>
                <li>
                  On Kill: Effect triggers something when killing an enemy
                </li>
                <li>
                  Stacks: Effect related to some stacking bonus
                </li>
                <li>
                  Health: Effect related to player's health like healing or causing self-harm
                </li>
                <li>
                  Ammo: Effect related to ammo like ammo consumption or magazine refilling
                </li>
                <li>
                  Audio: Effect related to unique sounds played. Most commonly used for items that talk to you.
                </li>
                <li>
                  Knockback: Item causes knockback
                </li>
                <li>
                  Melee: Effect related to melee damage (doesn't count for Melee Weapons in Wonderlands since they already are all about melee)
                </li>
                <li>
                  Random: Effect related to randomness
                </li>
                <li>
                  Reload: Effect related to reloading the item (only counts for Tediore if something unique is supposed to happen when reloading / Tediore chucking)
                </li>
                <li>
                  Drone: Effect related to spawning companion helpers (EX: OPQ System's alternate firing mode)
                </li>
                <li>
                  Ally: Effect related to turning enemies into allies (very rare effect)
                </li>
                <li>
                  ADS: Effect happens when aiming down sights (ADS)
                </li>
              </ul>
              Game: What game it is from
              <ul>
                <li>
                  Possible values: Borderlands 1, Borderlands 2, Borderlands: The Pre-Sequel, Borderlands 3, Tiny Tina's Wonderlands
                </li>
                <li>
                  For items that appear in multiple games, this is how you can distinguish between them.
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
                  Drop Origin reveals the loot source that has the item as a dedicated drop (if it exists)
                </li>
              </ul>
          </Modal.Body>
        </>
        )
    }
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
      <RenderTutorial/>
    </Modal>
  );
}

interface TutorialModalProps {
  show: boolean,
  handleClose: () => void,
  tutorialMode: string
}

export default TutorialModal