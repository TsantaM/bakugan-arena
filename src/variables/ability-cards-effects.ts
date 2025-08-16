type SwitchType = {
    label: string;
    controler: string;
    description: string;
}

export const AbilityCardsEffects: SwitchType[] = [
    {
        label: "Stop Gate",
        controler: "stopGate",
        description: "Cancels all effects of the gate."
    },
    {
        label: "Block Gate",
        controler: "blockGate",
        description: "Blocks the opponent's gate from opening."
    },
    {
        label: "Swipe Gate",
        controler: "swipeGate",
        description: "Swaps the gate with another one."
    },
    {
        label: "Move Self",
        controler: "moveSelf",
        description: "Allows you to move your own Bakugan."
    },
    {
        label: "Move Opponent",
        controler: "moveOpponent",
        description: "Allows you to move the opponent's Bakugan."
    },
    {
        label: "Move Another",
        controler: "moveAnOther",
        description: "Allows you to move another Bakugan on the battlefield (ally or enemy)."
    },
    {
        label: "Attract Opponent",
        controler: "attractOpponent",
        description: "Pulls an opponent's Bakugan onto the gate card you are currently on."
    },
    {
        label: "Cancel Abilities",
        controler: "cancelAbilities",
        description: "Cancels the opponent's abilities."
    },
    {
        label: "Protect From Gate",
        controler: "protectFromGate",
        description: "Protects against the opponent's gate card."
    },
    {
        label: "Protect From Abilities",
        controler: "protectFromAbilities",
        description: "Protects against the opponent's abilities."
    },
    {
        label: "Drain Ability Power",
        controler: "drainAbilityPower",
        description: "Absorbs all points added to the opponent."
    }
]
