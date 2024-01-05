import React from 'react';
import Head from 'next/head';
import styles from './segment.module.css';

export default function Segment({ percentage, direction }) {

  return (
    <div>
      <svg width="100%" height="100%" viewBox="0 0 591 591" version="1.1" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
        <g transform="matrix(1,0,0,1,-1469.53,-602.454)">
            <path d="M1469.53,602.454C1795.4,602.454 2059.97,867.02 2059.97,1192.89L2030.33,1192.89C2030.33,883.379 1779.05,632.096 1469.53,632.096L1469.53,602.454Z" style={{ fill: 'rgb(0,241,36)' }}/>
            <g transform="matrix(1.22465e-16,-1,1,1.22465e-16,276.643,2662.42)">
                <path d="M1469.53,602.454C1795.4,602.454 2059.97,867.02 2059.97,1192.89L2030.33,1192.89C2030.33,883.379 1779.05,632.096 1469.53,632.096L1469.53,602.454Z" style={{ fill: 'rgb(0,35,234)' }}/>
            </g>
        </g>
      </svg>
    </div>
  );
};