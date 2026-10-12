import React from 'react'
import { FLAVORS, findOption } from '../utilities/options'

const OUTLINE = '#5a2e1f'
const SCOOP_RADIUS = 42
const BASE_SCOOP_Y = 140
const SCOOP_STEP = 38

const SPECKLES = [[-20, -8], [12, -18], [22, 6], [-6, 12], [-26, 10], [4, -4], [-10, -24]]
const SPRINKLES = [[-24, -22, 30], [-8, -34, -20], [10, -30, 60], [26, -18, -45], [-14, -14, 80], [18, -6, 15], [0, -20, -70], [-30, -6, -10]]
const SPRINKLE_COLORS = ['#ff5c8a', '#ffd166', '#6ec6ff', '#8ce99a', '#b197fc']
const OREOS = [[-20, -26], [6, -34], [24, -14], [-4, -16], [-28, -6], [14, -2]]

const Cone = ({ cone }) => {
    switch (cone) {
        case 'cup':
            return (
                <g stroke={OUTLINE} strokeWidth='3' strokeLinejoin='round'>
                    <polygon points='50,152 150,152 134,262 66,262' fill='#fff5f8' />
                    <path d='M75,152 L82,262 M100,152 L100,262 M125,152 L118,262' stroke='#f28cb1' strokeWidth='7' />
                    <polygon points='50,152 150,152 134,262 66,262' fill='none' />
                    <rect x='44' y='146' width='112' height='14' rx='5' fill='#f28cb1' />
                </g>
            )
        case 'cake':
            return (
                <g stroke={OUTLINE} strokeWidth='3' strokeLinejoin='round'>
                    <polygon points='62,176 138,176 128,272 72,272' fill='#e8c48a' />
                    <path d='M80,176 L84,272 M100,176 L100,272 M120,176 L116,272' strokeWidth='2' opacity='0.6' />
                    <rect x='54' y='162' width='92' height='18' rx='4' fill='#efd3a0' />
                </g>
            )
        case 'waffle':
            return (
                <g stroke={OUTLINE} strokeWidth='3' strokeLinejoin='round'>
                    <polygon points='50,166 150,166 100,296' fill='#b5793a' />
                    <polygon points='50,166 150,166 100,296' fill='url(#waffle-hatch)' />
                    <rect x='44' y='156' width='112' height='18' rx='7' fill='#c98a4b' />
                </g>
            )
        case 'sugar':
        default:
            return (
                <g stroke={OUTLINE} strokeWidth='3' strokeLinejoin='round'>
                    <polygon points='58,166 142,166 100,292' fill='#c98a4b' />
                    <polygon points='58,166 142,166 100,292' fill='url(#waffle-hatch)' />
                </g>
            )
    }
}

const Scoop = ({ cy, flavor }) => (
    <g>
        <circle cx='100' cy={cy} r={SCOOP_RADIUS} fill={flavor.color} stroke={OUTLINE} strokeWidth='3' />
        {flavor.speckle && SPECKLES.map(([dx, dy], i) => (
            <ellipse key={i} cx={100 + dx} cy={cy + dy} rx='3.5' ry='2.5' fill={flavor.speckle} />
        ))}
    </g>
)

const Toppings = ({ cy, toppings }) => {
    const top = cy - SCOOP_RADIUS
    const has = (key) => toppings.includes(key)
    const cherryY = has('whipped_cream') ? top - 32 : top - 6

    return (
        <g>
            {has('hot_fudge') && (
                <path
                    d={`M58,${cy} A42,42 0 0 1 142,${cy} q-5,16 -10,0 q-6,24 -12,0 q-6,12 -12,0 q-6,28 -12,0 q-6,10 -12,0 q-6,20 -12,0 q-5,14 -12,0 Z`}
                    fill='#3d2416' stroke={OUTLINE} strokeWidth='2' strokeLinejoin='round'
                />
            )}
            {has('sprinkles') && SPRINKLES.map(([dx, dy, angle], i) => (
                <rect
                    key={i} x={100 + dx - 5} y={cy + dy - 1.5} width='10' height='3' rx='1.5'
                    fill={SPRINKLE_COLORS[i % SPRINKLE_COLORS.length]}
                    transform={`rotate(${angle} ${100 + dx} ${cy + dy})`}
                />
            ))}
            {has('crushed_oreos') && OREOS.map(([dx, dy], i) => (
                <circle key={i} cx={100 + dx} cy={cy + dy} r={i % 2 ? 3.5 : 5} fill='#1f1a17' />
            ))}
            {has('whipped_cream') && (
                <g fill='#ffffff' stroke='#e9d8de' strokeWidth='2'>
                    <ellipse cx='80' cy={top + 6} rx='20' ry='13' />
                    <ellipse cx='120' cy={top + 6} rx='20' ry='13' />
                    <ellipse cx='100' cy={top - 6} rx='22' ry='15' />
                    <ellipse cx='100' cy={top - 20} rx='11' ry='9' />
                </g>
            )}
            {has('cherry') && (
                <g>
                    <path d={`M100,${cherryY - 8} q4,-14 14,-18`} stroke='#3f7d3a' strokeWidth='3' fill='none' strokeLinecap='round' />
                    <circle cx='100' cy={cherryY} r='11' fill='#d62839' stroke={OUTLINE} strokeWidth='2.5' />
                    <circle cx='96' cy={cherryY - 4} r='3' fill='#ffffff' opacity='0.7' />
                </g>
            )}
        </g>
    )
}

const IcecreamPreview = ({ cone, scoops, flavor, toppings = [], className = '' }) => {
    const flavorOption = findOption(FLAVORS, flavor) ?? FLAVORS[0]
    const scoopYs = Array.from({ length: scoops }, (_, i) => BASE_SCOOP_Y - i * SCOOP_STEP)
    const topScoopY = scoopYs[scoopYs.length - 1]

    return (
        <svg
            className={`icecream-preview ${className}`}
            viewBox='0 -80 200 380'
            role='img'
            aria-label={`${scoops} scoop ${flavorOption.label} ice cream`}
        >
            <defs>
                <pattern id='waffle-hatch' width='14' height='14' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
                    <path d='M0,0 L0,14 M0,0 L14,0' stroke='rgba(90, 46, 31, 0.55)' strokeWidth='3' />
                </pattern>
            </defs>

            {/* draw top scoop first so each lower scoop sits in front of the one above it */}
            {[...scoopYs].reverse().map(cy => <Scoop key={cy} cy={cy} flavor={flavorOption} />)}
            <Cone cone={cone} />
            <Toppings cy={topScoopY} toppings={toppings} />
        </svg>
    )
}

export default IcecreamPreview
