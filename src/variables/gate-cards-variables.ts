import { values } from "@/components/elements/game-designer/manage-bakugans/add-bakugans/add-bakugan-values";
import { SwitchType } from "./ability-cards-effects";

export const GateCardBonusAndMalus: values[] = [
    {
        label: '0',
        value: '0'
    },
        {
        label: '100',
        value: '100'
    },
        {
        label: '150',
        value: '150'
    },
        {
        label: '200',
        value: '200'
    },
]

export const GateCardsEffects1Conditions: SwitchType[] = [
  {
    label: "Fight End",
    controler: "Effect1_Conditions_FightEnd",
    description: "The effect only triggers when the fight ends.",
  },
];

export const GateCardsEffects2Conditions: SwitchType[] = [
  {
    label: "Fight End",
    controler: "Effect2_Conditions_FightEnd",
    description: "The effect only triggers when the fight ends.",
  },
];


export const GateCardsEffects1: SwitchType[] = [
  {
    label: "Elimination",
    controler: "Effect1_elimination",
    description: "Removes a target from the battlefield.",
  },
  {
    label: "Block Element Abilities",
    controler: "Effect1_blockElementAbilities",
    description: "Prevents elemental abilities from being activated.",
  },
  {
    label: "Block Entries",
    controler: "Effect1_blockEntries",
    description: "Stops new entries from being placed on the field.",
  },
  {
    label: "No Retreat",
    controler: "Effect1_noRetreat",
    description: "Prevents a unit from retreating once engaged.",
  },
  {
    label: "Two Base Power",
    controler: "Effect1_twoBasePower",
    description: "Doubles the base power of the affected unit.",
  },
  {
    label: "Swipe Power",
    controler: "Effect1_swipePower",
    description: "Swaps the power value with the opponent’s unit.",
  },
  {
    label: "Drain Opponent",
    controler: "Effect1_drainOponent",
    description: "Drains energy or points from the opponent.",
  },
  {
    label: "Change Target Attribute",
    controler: "Effect1_changeTargetAttr",
    description: "Changes the main attribute of a chosen target.",
  },
  {
    label: "Change Attribute Except Secondary",
    controler: "Effect1_changeAttrExeptSecAtrr",
    description: "Changes all attributes except the secondary one.",
  },
];

export const GateCardsEffects2: SwitchType[] = [
  {
    label: "Elimination",
    controler: "Effect2_elimination",
    description: "Removes a target from the battlefield.",
  },
  {
    label: "Block Element Abilities",
    controler: "Effect2_blockElementAbilities",
    description: "Prevents elemental abilities from being activated.",
  },
  {
    label: "Block Entries",
    controler: "Effect2_blockEntries",
    description: "Stops new entries from being placed on the field.",
  },
  {
    label: "No Retreat",
    controler: "Effect2_noRetreat",
    description: "Prevents a unit from retreating once engaged.",
  },
  {
    label: "Two Base Power",
    controler: "Effect2_twoBasePower",
    description: "Doubles the base power of the affected unit.",
  },
  {
    label: "Swipe Power",
    controler: "Effect2_swipePower",
    description: "Swaps the power value with the opponent’s unit.",
  },
  {
    label: "Drain Opponent",
    controler: "Effect2_drainOponent",
    description: "Drains energy or points from the opponent.",
  },
  {
    label: "Change Target Attribute",
    controler: "Effect2_changeTargetAttr",
    description: "Changes the main attribute of a chosen target.",
  },
  {
    label: "Change Attribute Except Secondary",
    controler: "Effect2_changeAttrExeptSecAtrr",
    description: "Changes all attributes except the secondary one.",
  },
];

export const GateCardsSideEffects: SwitchType[] = [
  {
    label: "Count Gates",
    controler: "countGates",
    description: "Counts the number of gates currently on the battlefield.",
  },
  {
    label: "Count Same Attribute",
    controler: "countSameAttr",
    description: "Counts the number of units with the same attribute.",
  },
];

export const gateCardCategory : values[] = [
    {
        label: 'Elementary',
        value: 'Elementary'
    },
    {
        label: 'Character',
        value: 'Character'
    },
    {
        label: 'Command',
        value: 'Command'
    },
    {
        label: 'Trap',
        value: 'Trap'
    }
]

export const gateCardTarget: values[] = [
    {
        label: 'Owner',
        value: 'Howner'
    },
    {
        label: 'Opponent',
        value: 'Opponent'
    },
    {
        label: 'All',
        value: 'All'
    },
    {
        label: 'Winner',
        value: 'Winner'
    },

]