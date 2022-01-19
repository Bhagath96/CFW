import React from 'react';
import Move from './Animate';

const rotate = ({ children }) => (<Move
    rotation={90}
    timing={200}
    springConfig={{ tension: 200, friction: 7 }}
>
    {children}
</Move>);

const scale = ({ children }) => (
    <Move scale={1.5} springConfig={{ mass: 2, tension: 900, friction: 20 }}>
        {children}
    </Move>);

const move = ({ children, x = -10 }) => (
    <Move x={x}>
        {children}
    </Move>);

const Animate = { move, scale, rotate };

export default Animate;

