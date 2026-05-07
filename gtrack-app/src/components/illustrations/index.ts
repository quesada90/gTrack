import React from 'react'

export interface IllustrationProps {
  muscleColor: string
  animate?: boolean
  size?: number
}

// Leg Press
export const LegPress: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Machine platform
    React.createElement('rect', { x: '130', y: '60', width: '50', height: '80', rx: '4', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '120', y: '95', width: '15', height: '10', fill: '#333' }),
    // Seat
    React.createElement('rect', { x: '30', y: '110', width: '70', height: '12', rx: '4', fill: '#333' }),
    React.createElement('rect', { x: '30', y: '90', width: '12', height: '35', rx: '3', fill: '#2A2A2A' }),
    // Body - torso
    React.createElement('rect', { x: '55', y: '70', width: '22', height: '42', rx: '8', fill: '#4B4B4B' }),
    // Head
    React.createElement('circle', { cx: '66', cy: '60', r: '10', fill: '#4B4B4B' }),
    // Upper legs (quads) - highlighted
    React.createElement('path', { d: 'M60 112 L90 140 L80 145 L50 117 Z', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Lower legs
    React.createElement('path', { d: 'M90 140 L120 100 L128 105 L100 148 Z', fill: '#4B4B4B' }),
    // Foot on platform
    React.createElement('rect', { x: '125', y: '93', width: '12', height: '6', rx: '2', fill: '#555' }),
  )
)

// Chest Press
export const ChestPress: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Machine frame
    React.createElement('rect', { x: '10', y: '40', width: '12', height: '120', rx: '4', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '178', y: '40', width: '12', height: '120', rx: '4', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '10', y: '90', width: '35', height: '10', rx: '3', fill: '#333' }),
    React.createElement('rect', { x: '155', y: '90', width: '35', height: '10', rx: '3', fill: '#333' }),
    // Seat
    React.createElement('rect', { x: '75', y: '130', width: '50', height: '12', rx: '4', fill: '#333' }),
    // Body - torso with chest highlighted
    React.createElement('rect', { x: '82', y: '80', width: '36', height: '52', rx: '8', fill: '#4B4B4B' }),
    React.createElement('ellipse', { cx: '100', cy: '100', rx: '16', ry: '20', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Head
    React.createElement('circle', { cx: '100', cy: '68', r: '10', fill: '#4B4B4B' }),
    // Arms extended
    React.createElement('line', { x1: '82', y1: '95', x2: '45', y2: '95', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '118', y1: '95', x2: '155', y2: '95', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    // Handles
    React.createElement('circle', { cx: '45', cy: '95', r: '5', fill: '#555' }),
    React.createElement('circle', { cx: '155', cy: '95', r: '5', fill: '#555' }),
  )
)

// Shoulder Press
export const ShoulderPress: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Seat back
    React.createElement('rect', { x: '80', y: '90', width: '40', height: '70', rx: '6', fill: '#2A2A2A' }),
    // Seat
    React.createElement('rect', { x: '70', y: '155', width: '60', height: '12', rx: '4', fill: '#333' }),
    // Body torso
    React.createElement('rect', { x: '84', y: '90', width: '32', height: '50', rx: '6', fill: '#4B4B4B' }),
    // Head
    React.createElement('circle', { cx: '100', cy: '78', r: '10', fill: '#4B4B4B' }),
    // Shoulders highlighted
    React.createElement('ellipse', { cx: '84', cy: '97', rx: '10', ry: '10', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    React.createElement('ellipse', { cx: '116', cy: '97', rx: '10', ry: '10', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Arms going up
    React.createElement('line', { x1: '84', y1: '97', x2: '60', y2: '55', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '116', y1: '97', x2: '140', y2: '55', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    // Bar
    React.createElement('rect', { x: '55', y: '48', width: '90', height: '8', rx: '4', fill: '#555' }),
  )
)

// Pec Deck
export const PecDeck: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Machine
    React.createElement('rect', { x: '10', y: '50', width: '10', height: '110', rx: '3', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '180', y: '50', width: '10', height: '110', rx: '3', fill: '#2A2A2A' }),
    React.createElement('path', { d: 'M20 80 Q60 100 90 95', stroke: '#333', strokeWidth: '8', fill: 'none', strokeLinecap: 'round' }),
    React.createElement('path', { d: 'M180 80 Q140 100 110 95', stroke: '#333', strokeWidth: '8', fill: 'none', strokeLinecap: 'round' }),
    // Seat
    React.createElement('rect', { x: '75', y: '140', width: '50', height: '12', rx: '4', fill: '#333' }),
    // Body
    React.createElement('rect', { x: '83', y: '90', width: '34', height: '52', rx: '8', fill: '#4B4B4B' }),
    // Chest highlighted
    React.createElement('ellipse', { cx: '100', cy: '106', rx: '15', ry: '18', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Head
    React.createElement('circle', { cx: '100', cy: '78', r: '10', fill: '#4B4B4B' }),
    // Forearms on pads
    React.createElement('line', { x1: '83', y1: '100', x2: '55', y2: '95', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '117', y1: '100', x2: '145', y2: '95', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
  )
)

// Triceps Pushdown
export const TricepsPushdown: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Cable machine
    React.createElement('rect', { x: '85', y: '15', width: '30', height: '50', rx: '4', fill: '#2A2A2A' }),
    React.createElement('circle', { cx: '100', cy: '60', r: '6', fill: '#555' }),
    // Cable
    React.createElement('line', { x1: '100', y1: '60', x2: '100', y2: '90', stroke: '#555', strokeWidth: '2' }),
    // Bar handle
    React.createElement('rect', { x: '75', y: '88', width: '50', height: '7', rx: '3', fill: '#555' }),
    // Body
    React.createElement('circle', { cx: '100', cy: '65', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '86', y: '73', width: '28', height: '50', rx: '8', fill: '#4B4B4B' }),
    // Upper arms (fixed at sides)
    React.createElement('line', { x1: '86', y1: '80', x2: '78', y2: '95', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '114', y1: '80', x2: '122', y2: '95', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    // Forearms/triceps area highlighted
    React.createElement('line', { x1: '78', y1: '95', x2: '78', y2: '130', stroke: muscleColor, strokeWidth: '9', strokeLinecap: 'round', className: animate ? 'muscle-pulse' : '' }),
    React.createElement('line', { x1: '122', y1: '95', x2: '122', y2: '130', stroke: muscleColor, strokeWidth: '9', strokeLinecap: 'round', className: animate ? 'muscle-pulse' : '' }),
    // Hands on bar
    React.createElement('circle', { cx: '80', cy: '91', r: '4', fill: '#555' }),
    React.createElement('circle', { cx: '120', cy: '91', r: '4', fill: '#555' }),
    // Legs
    React.createElement('line', { x1: '92', y1: '123', x2: '88', y2: '165', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '108', y1: '123', x2: '112', y2: '165', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
  )
)

// Plancha Frontal
export const PlanchaFrontal: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Floor
    React.createElement('line', { x1: '10', y1: '145', x2: '190', y2: '145', stroke: '#2A2A2A', strokeWidth: '3' }),
    // Body horizontal
    React.createElement('rect', { x: '50', y: '120', width: '100', height: '20', rx: '8', fill: '#4B4B4B' }),
    // Core highlighted
    React.createElement('rect', { x: '75', y: '121', width: '50', height: '18', rx: '6', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Head
    React.createElement('circle', { cx: '40', cy: '128', r: '10', fill: '#4B4B4B' }),
    // Forearms
    React.createElement('line', { x1: '55', y1: '140', x2: '55', y2: '145', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '75', y1: '140', x2: '75', y2: '145', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    // Elbow support line
    React.createElement('line', { x1: '50', y1: '145', x2: '80', y2: '145', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    // Feet/toes
    React.createElement('circle', { cx: '155', cy: '142', r: '5', fill: '#555' }),
    React.createElement('circle', { cx: '165', cy: '142', r: '5', fill: '#555' }),
  )
)

// Dead Bug
export const DeadBug: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Floor
    React.createElement('line', { x1: '10', y1: '145', x2: '190', y2: '145', stroke: '#2A2A2A', strokeWidth: '3' }),
    // Body lying on back
    React.createElement('rect', { x: '55', y: '125', width: '80', height: '18', rx: '8', fill: '#4B4B4B' }),
    // Core highlighted
    React.createElement('rect', { x: '70', y: '126', width: '45', height: '16', rx: '5', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Head
    React.createElement('circle', { cx: '44', cy: '132', r: '10', fill: '#4B4B4B' }),
    // Left arm up
    React.createElement('line', { x1: '65', y1: '128', x2: '45', y2: '90', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    // Right leg extended
    React.createElement('line', { x1: '125', y1: '130', x2: '170', y2: '110', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    // Right arm bent
    React.createElement('line', { x1: '95', y1: '128', x2: '115', y2: '95', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    // Left leg bent up
    React.createElement('line', { x1: '110', y1: '130', x2: '90', y2: '108', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '90', y1: '108', x2: '75', y2: '115', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
  )
)

// Pull Down
export const PullDown: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Machine top
    React.createElement('rect', { x: '30', y: '15', width: '140', height: '20', rx: '4', fill: '#2A2A2A' }),
    // Pulley
    React.createElement('circle', { cx: '100', cy: '35', r: '7', fill: '#555' }),
    // Cable and bar
    React.createElement('line', { x1: '100', y1: '42', x2: '100', y2: '60', stroke: '#555', strokeWidth: '2' }),
    React.createElement('rect', { x: '55', y: '58', width: '90', height: '7', rx: '3', fill: '#555' }),
    // Weight stack
    React.createElement('rect', { x: '155', y: '35', width: '18', height: '80', rx: '3', fill: '#333' }),
    React.createElement('rect', { x: '157', y: '55', width: '14', height: '6', rx: '1', fill: '#555' }),
    // Seat
    React.createElement('rect', { x: '72', y: '145', width: '56', height: '12', rx: '4', fill: '#333' }),
    // Body
    React.createElement('circle', { cx: '100', cy: '80', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '85', y: '88', width: '30', height: '55', rx: '8', fill: '#4B4B4B' }),
    // Lats highlighted
    React.createElement('path', { d: 'M85 95 Q70 115 80 135 L85 140 Q82 118 90 100 Z', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    React.createElement('path', { d: 'M115 95 Q130 115 120 135 L115 140 Q118 118 110 100 Z', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Arms reaching up
    React.createElement('line', { x1: '87', y1: '93', x2: '60', y2: '63', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '113', y1: '93', x2: '140', y2: '63', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
  )
)

// Low Row
export const LowRow: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Foot plate
    React.createElement('rect', { x: '10', y: '130', width: '40', height: '10', rx: '3', fill: '#2A2A2A' }),
    // Cable
    React.createElement('line', { x1: '40', y1: '135', x2: '100', y2: '110', stroke: '#555', strokeWidth: '2' }),
    // Handle
    React.createElement('circle', { cx: '100', cy: '110', r: '5', fill: '#555' }),
    // Machine base
    React.createElement('rect', { x: '10', y: '140', width: '185', height: '8', rx: '3', fill: '#333' }),
    // Body seated and leaning forward slightly
    React.createElement('circle', { cx: '120', cy: '80', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '105', y: '88', width: '30', height: '50', rx: '8', fill: '#4B4B4B' }),
    // Mid-back highlighted
    React.createElement('ellipse', { cx: '120', cy: '100', rx: '15', ry: '20', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Arms pulling back
    React.createElement('line', { x1: '107', y1: '100', x2: '100', y2: '110', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '108', y1: '108', x2: '100', y2: '115', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    // Legs
    React.createElement('line', { x1: '112', y1: '138', x2: '70', y2: '135', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '125', y1: '138', x2: '165', y2: '135', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
  )
)

// Assisted Pull-up
export const AssistedPullUp: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Bar at top
    React.createElement('rect', { x: '30', y: '25', width: '140', height: '10', rx: '4', fill: '#2A2A2A' }),
    // Machine uprights
    React.createElement('rect', { x: '30', y: '15', width: '10', height: '160', rx: '3', fill: '#333' }),
    React.createElement('rect', { x: '160', y: '15', width: '10', height: '160', rx: '3', fill: '#333' }),
    // Knee pad
    React.createElement('rect', { x: '70', y: '120', width: '60', height: '12', rx: '5', fill: '#2A2A2A' }),
    // Body
    React.createElement('circle', { cx: '100', cy: '55', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '85', y: '63', width: '30', height: '55', rx: '8', fill: '#4B4B4B' }),
    // Lats highlighted
    React.createElement('path', { d: 'M85 70 Q68 90 75 110 L82 115 Q76 95 88 78 Z', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    React.createElement('path', { d: 'M115 70 Q132 90 125 110 L118 115 Q124 95 112 78 Z', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Arms up on bar
    React.createElement('line', { x1: '87', y1: '68', x2: '68', y2: '32', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '113', y1: '68', x2: '132', y2: '32', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    // Knees on pad
    React.createElement('line', { x1: '92', y1: '118', x2: '85', y2: '132', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '108', y1: '118', x2: '115', y2: '132', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
  )
)

// Curl Biceps
export const CurlBiceps: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Cable machine base
    React.createElement('rect', { x: '10', y: '130', width: '30', height: '50', rx: '3', fill: '#2A2A2A' }),
    React.createElement('circle', { cx: '25', cy: '130', r: '5', fill: '#555' }),
    // Cable
    React.createElement('line', { x1: '25', y1: '130', x2: '78', y2: '120', stroke: '#555', strokeWidth: '2' }),
    // Handle
    React.createElement('circle', { cx: '78', cy: '120', r: '4', fill: '#555' }),
    // Body standing
    React.createElement('circle', { cx: '110', cy: '65', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '96', y: '73', width: '28', height: '55', rx: '8', fill: '#4B4B4B' }),
    // Right arm curled (bicep highlighted)
    React.createElement('line', { x1: '98', y1: '80', x2: '85', y2: '95', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '85', y1: '95', x2: '78', y2: '120', stroke: muscleColor, strokeWidth: '9', strokeLinecap: 'round', className: animate ? 'muscle-pulse' : '' }),
    // Bicep bulge
    React.createElement('ellipse', { cx: '82', cy: '108', rx: '8', ry: '12', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Left arm straight
    React.createElement('line', { x1: '122', y1: '80', x2: '130', y2: '128', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    // Legs
    React.createElement('line', { x1: '103', y1: '128', x2: '95', y2: '175', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '117', y1: '128', x2: '125', y2: '175', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    // Floor
    React.createElement('line', { x1: '10', y1: '178', x2: '190', y2: '178', stroke: '#2A2A2A', strokeWidth: '3' }),
  )
)

// Face Pull
export const FacePull: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Cable machine
    React.createElement('rect', { x: '155', y: '50', width: '30', height: '120', rx: '3', fill: '#2A2A2A' }),
    React.createElement('circle', { cx: '160', cy: '90', r: '6', fill: '#555' }),
    // Rope handle
    React.createElement('line', { x1: '160', y1: '90', x2: '120', y2: '95', stroke: '#555', strokeWidth: '2' }),
    React.createElement('line', { x1: '160', y1: '90', x2: '120', y2: '85', stroke: '#555', strokeWidth: '2' }),
    // Body
    React.createElement('circle', { cx: '80', cy: '75', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '66', y: '83', width: '28', height: '55', rx: '8', fill: '#4B4B4B' }),
    // Rear deltoids highlighted
    React.createElement('ellipse', { cx: '68', cy: '92', rx: '9', ry: '9', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    React.createElement('ellipse', { cx: '92', cy: '92', rx: '9', ry: '9', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Arms pulling to face level, elbows high
    React.createElement('line', { x1: '68', y1: '92', x2: '90', y2: '70', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '90', y1: '70', x2: '120', y2: '85', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '92', y1: '92', x2: '110', y2: '72', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '110', y1: '72', x2: '120', y2: '88', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    // Legs
    React.createElement('line', { x1: '72', y1: '138', x2: '65', y2: '178', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '88', y1: '138', x2: '95', y2: '178', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '10', y1: '178', x2: '190', y2: '178', stroke: '#2A2A2A', strokeWidth: '3' }),
  )
)

// Dead Hang
export const DeadHang: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Bar
    React.createElement('rect', { x: '30', y: '20', width: '140', height: '10', rx: '4', fill: '#2A2A2A' }),
    // Frame
    React.createElement('rect', { x: '30', y: '10', width: '10', height: '170', rx: '3', fill: '#333' }),
    React.createElement('rect', { x: '160', y: '10', width: '10', height: '170', rx: '3', fill: '#333' }),
    // Body hanging straight
    React.createElement('circle', { cx: '100', cy: '60', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '86', y: '68', width: '28', height: '60', rx: '8', fill: '#4B4B4B' }),
    // Hands/grip highlighted
    React.createElement('circle', { cx: '70', cy: '30', r: '7', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    React.createElement('circle', { cx: '130', cy: '30', r: '7', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Arms straight up
    React.createElement('line', { x1: '88', y1: '70', x2: '70', y2: '37', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '112', y1: '70', x2: '130', y2: '37', stroke: '#4B4B4B', strokeWidth: '9', strokeLinecap: 'round' }),
    // Legs hanging
    React.createElement('line', { x1: '93', y1: '128', x2: '88', y2: '175', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '107', y1: '128', x2: '112', y2: '175', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
  )
)

// Plancha Lateral
export const PlanchaLateral: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Floor
    React.createElement('line', { x1: '10', y1: '150', x2: '190', y2: '150', stroke: '#2A2A2A', strokeWidth: '3' }),
    // Body sideways
    React.createElement('rect', { x: '50', y: '110', width: '110', height: '18', rx: '8', fill: '#4B4B4B', transform: 'rotate(-8 100 120)' }),
    // Lateral core highlighted
    React.createElement('rect', { x: '75', y: '111', width: '50', height: '16', rx: '5', fill: muscleColor, className: animate ? 'muscle-pulse' : '', transform: 'rotate(-8 100 120)' }),
    // Head
    React.createElement('circle', { cx: '45', cy: '122', r: '10', fill: '#4B4B4B' }),
    // Bottom elbow support
    React.createElement('line', { x1: '60', y1: '135', x2: '60', y2: '150', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '50', y1: '150', x2: '75', y2: '150', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    // Top arm raised
    React.createElement('line', { x1: '90', y1: '112', x2: '90', y2: '80', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    // Feet stacked
    React.createElement('circle', { cx: '162', cy: '145', r: '5', fill: '#555' }),
    React.createElement('circle', { cx: '168', cy: '148', r: '5', fill: '#555' }),
  )
)

// Leg Extension
export const LegExtension: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Machine
    React.createElement('rect', { x: '10', y: '80', width: '12', height: '100', rx: '3', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '10', y: '80', width: '80', height: '12', rx: '3', fill: '#333' }),
    // Seat
    React.createElement('rect', { x: '60', y: '90', width: '60', height: '12', rx: '4', fill: '#333' }),
    // Seat back
    React.createElement('rect', { x: '115', y: '50', width: '12', height: '55', rx: '3', fill: '#2A2A2A' }),
    // Body seated
    React.createElement('circle', { cx: '95', cy: '68', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '80', y: '75', width: '28', height: '20', rx: '6', fill: '#4B4B4B' }),
    // Upper thigh
    React.createElement('line', { x1: '90', y1: '100', x2: '60', y2: '102', stroke: '#4B4B4B', strokeWidth: '12', strokeLinecap: 'round' }),
    // Lower leg extended - quads highlighted
    React.createElement('line', { x1: '60', y1: '102', x2: '25', y2: '90', stroke: muscleColor, strokeWidth: '10', strokeLinecap: 'round', className: animate ? 'muscle-pulse' : '' }),
    // Pad
    React.createElement('circle', { cx: '27', cy: '90', r: '7', fill: '#333' }),
    // Other leg bent down
    React.createElement('line', { x1: '100', y1: '100', x2: '130', y2: '102', stroke: '#4B4B4B', strokeWidth: '12', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '130', y1: '102', x2: '135', y2: '145', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
  )
)

// Leg Curl
export const LegCurl: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Machine bench
    React.createElement('rect', { x: '20', y: '95', width: '160', height: '15', rx: '5', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '20', y: '110', width: '12', height: '50', rx: '3', fill: '#333' }),
    React.createElement('rect', { x: '168', y: '110', width: '12', height: '50', rx: '3', fill: '#333' }),
    // Ankle pad mechanism
    React.createElement('rect', { x: '20', y: '88', width: '25', height: '10', rx: '3', fill: '#333' }),
    // Body prone (face down)
    React.createElement('rect', { x: '45', y: '80', width: '110', height: '18', rx: '8', fill: '#4B4B4B' }),
    // Head
    React.createElement('circle', { cx: '160', cy: '88', r: '9', fill: '#4B4B4B' }),
    // Legs - one curled up (hamstrings highlighted)
    React.createElement('line', { x1: '65', y1: '87', x2: '45', y2: '95', stroke: '#4B4B4B', strokeWidth: '11', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '45', y1: '95', x2: '50', y2: '55', stroke: muscleColor, strokeWidth: '10', strokeLinecap: 'round', className: animate ? 'muscle-pulse' : '' }),
    // Other leg straight
    React.createElement('line', { x1: '50', y1: '87', x2: '22', y2: '88', stroke: '#4B4B4B', strokeWidth: '11', strokeLinecap: 'round' }),
    // Ankle pad
    React.createElement('circle', { cx: '50', cy: '55', r: '6', fill: '#333' }),
    // Arms on sides
    React.createElement('line', { x1: '130', y1: '82', x2: '150', y2: '110', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
  )
)

// Hip Abduction
export const HipAbduction: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Machine
    React.createElement('rect', { x: '65', y: '130', width: '70', height: '50', rx: '5', fill: '#2A2A2A' }),
    // Pads
    React.createElement('rect', { x: '25', y: '110', width: '50', height: '10', rx: '4', fill: '#333' }),
    React.createElement('rect', { x: '125', y: '110', width: '50', height: '10', rx: '4', fill: '#333' }),
    // Seat
    React.createElement('rect', { x: '70', y: '118', width: '60', height: '12', rx: '4', fill: '#333' }),
    // Back support
    React.createElement('rect', { x: '88', y: '55', width: '24', height: '65', rx: '5', fill: '#2A2A2A' }),
    // Body
    React.createElement('circle', { cx: '100', cy: '70', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '85', y: '78', width: '30', height: '44', rx: '8', fill: '#4B4B4B' }),
    // Legs spread apart - outer thigh highlighted
    React.createElement('line', { x1: '88', y1: '118', x2: '50', y2: '115', stroke: muscleColor, strokeWidth: '12', strokeLinecap: 'round', className: animate ? 'muscle-pulse' : '' }),
    React.createElement('line', { x1: '112', y1: '118', x2: '150', y2: '115', stroke: muscleColor, strokeWidth: '12', strokeLinecap: 'round', className: animate ? 'muscle-pulse' : '' }),
    // Lower legs hanging
    React.createElement('line', { x1: '50', y1: '115', x2: '42', y2: '150', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '150', y1: '115', x2: '158', y2: '150', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
  )
)

// Hip Thrust
export const HipThrust: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Bench
    React.createElement('rect', { x: '10', y: '100', width: '90', height: '20', rx: '5', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '10', y: '120', width: '10', height: '40', rx: '3', fill: '#333' }),
    React.createElement('rect', { x: '90', y: '120', width: '10', height: '40', rx: '3', fill: '#333' }),
    // Floor
    React.createElement('line', { x1: '10', y1: '160', x2: '190', y2: '160', stroke: '#2A2A2A', strokeWidth: '3' }),
    // Body semi-reclined, hips up
    React.createElement('circle', { cx: '40', cy: '90', r: '10', fill: '#4B4B4B' }),
    // Upper back on bench
    React.createElement('rect', { x: '25', y: '98', width: '55', height: '16', rx: '6', fill: '#4B4B4B' }),
    // Hips/glutes raised - highlighted
    React.createElement('ellipse', { cx: '100', cy: '105', rx: '22', ry: '20', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Thighs going to feet on floor
    React.createElement('line', { x1: '115', y1: '118', x2: '140', y2: '155', stroke: '#4B4B4B', strokeWidth: '12', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '88', y1: '118', x2: '68', y2: '155', stroke: '#4B4B4B', strokeWidth: '12', strokeLinecap: 'round' }),
    // Feet flat
    React.createElement('rect', { x: '130', y: '152', width: '20', height: '8', rx: '3', fill: '#555' }),
    React.createElement('rect', { x: '52', y: '152', width: '20', height: '8', rx: '3', fill: '#555' }),
    // Barbell across hips
    React.createElement('rect', { x: '65', y: '98', width: '75', height: '8', rx: '4', fill: '#555' }),
    React.createElement('circle', { cx: '70', cy: '102', r: '10', fill: '#444', stroke: '#555', strokeWidth: '2' }),
    React.createElement('circle', { cx: '130', cy: '102', r: '10', fill: '#444', stroke: '#555', strokeWidth: '2' }),
  )
)

// Elevacion Talones
export const ElevacionTalones: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Machine shoulder pads
    React.createElement('rect', { x: '70', y: '55', width: '60', height: '12', rx: '5', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '78', y: '55', width: '20', height: '8', rx: '3', fill: '#333' }),
    React.createElement('rect', { x: '102', y: '55', width: '20', height: '8', rx: '3', fill: '#333' }),
    // Body standing
    React.createElement('circle', { cx: '100', cy: '45', r: '10', fill: '#4B4B4B' }),
    React.createElement('rect', { x: '85', y: '55', width: '30', height: '60', rx: '8', fill: '#4B4B4B' }),
    // Legs
    React.createElement('line', { x1: '93', y1: '115', x2: '88', y2: '150', stroke: '#4B4B4B', strokeWidth: '11', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '107', y1: '115', x2: '112', y2: '150', stroke: '#4B4B4B', strokeWidth: '11', strokeLinecap: 'round' }),
    // Calves highlighted (rising on toes)
    React.createElement('ellipse', { cx: '88', cy: '155', rx: '8', ry: '14', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    React.createElement('ellipse', { cx: '112', cy: '155', rx: '8', ry: '14', fill: muscleColor, className: animate ? 'muscle-pulse' : '' }),
    // Toes/ball of foot on platform
    React.createElement('rect', { x: '60', y: '163', width: '80', height: '8', rx: '3', fill: '#2A2A2A' }),
    React.createElement('rect', { x: '78', y: '155', width: '15', height: '8', rx: '2', fill: '#555' }),
    React.createElement('rect', { x: '105', y: '155', width: '15', height: '8', rx: '2', fill: '#555' }),
  )
)

// Hollow Body Hold
export const HollowBody: React.FC<IllustrationProps> = ({ muscleColor, animate = true }) => (
  React.createElement('svg', { viewBox: '0 0 200 200', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    // Floor
    React.createElement('line', { x1: '10', y1: '135', x2: '190', y2: '135', stroke: '#2A2A2A', strokeWidth: '3' }),
    // Body in hollow position (curved, low)
    React.createElement('path', { d: 'M30 120 Q100 105 170 118', stroke: '#4B4B4B', strokeWidth: '18', fill: 'none', strokeLinecap: 'round' }),
    // Core highlighted
    React.createElement('path', { d: 'M75 108 Q100 103 125 110', stroke: muscleColor, strokeWidth: '14', fill: 'none', strokeLinecap: 'round', className: animate ? 'muscle-pulse' : '' }),
    // Head
    React.createElement('circle', { cx: '22', cy: '115', r: '9', fill: '#4B4B4B' }),
    // Arms extended overhead
    React.createElement('line', { x1: '30', y1: '118', x2: '10', y2: '100', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '38', y1: '114', x2: '18', y2: '96', stroke: '#4B4B4B', strokeWidth: '8', strokeLinecap: 'round' }),
    // Legs extended and low
    React.createElement('line', { x1: '162', y1: '116', x2: '190', y2: '108', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
    React.createElement('line', { x1: '165', y1: '122', x2: '190', y2: '115', stroke: '#4B4B4B', strokeWidth: '10', strokeLinecap: 'round' }),
  )
)

export const ILLUSTRATION_MAP: Record<string, React.FC<IllustrationProps>> = {
  'leg-press': LegPress,
  'chest-press': ChestPress,
  'shoulder-press': ShoulderPress,
  'pec-deck': PecDeck,
  'triceps-pushdown': TricepsPushdown,
  'plancha-frontal': PlanchaFrontal,
  'dead-bug': DeadBug,
  'pull-down': PullDown,
  'low-row': LowRow,
  'assisted-pull-up': AssistedPullUp,
  'curl-biceps': CurlBiceps,
  'face-pull': FacePull,
  'dead-hang': DeadHang,
  'plancha-lateral': PlanchaLateral,
  'leg-extension': LegExtension,
  'leg-curl': LegCurl,
  'hip-abduction': HipAbduction,
  'hip-thrust': HipThrust,
  'elevacion-talones': ElevacionTalones,
  'hollow-body': HollowBody,
}
