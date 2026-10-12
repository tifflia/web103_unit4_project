import React from 'react'
import { CONES, FLAVORS, TOPPINGS, findOption } from '../utilities/options'

const IcecreamFacts = ({ icecream }) => {
    const toppingLabels = icecream.toppings.map(key => findOption(TOPPINGS, key)?.label ?? key)

    const facts = [
        ['🍦 Cone', findOption(CONES, icecream.cone)?.label ?? icecream.cone],
        ['🔢 Scoops', icecream.scoops],
        ['🎨 Flavor', findOption(FLAVORS, icecream.flavor)?.label ?? icecream.flavor],
        ['🍒 Toppings', toppingLabels.length ? toppingLabels.join(', ') : 'None']
    ]

    return (
        <dl className='icecream-facts'>
            {facts.map(([label, value]) => (
                <div key={label} className='fact'>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                </div>
            ))}
        </dl>
    )
}

export default IcecreamFacts
