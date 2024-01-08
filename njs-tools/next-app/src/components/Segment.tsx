import styles from './segment.module.css';

export default function Segment({ radius, stroke, percentage, reversed }) {

  const SIZE = radius + stroke;
  const CIRCUMFERENCE = Math.PI * radius * 8;

  return (
    <div className={styles.container}>
      <svg height={SIZE} width={SIZE} style={reversed ? { transform: 'scaleX(-1) rotate(90deg)' } : {}}>
        <circle r={radius} stroke="#FFFFFF" strokeWidth={stroke} fill="none" pathLength={CIRCUMFERENCE} strokeDasharray={`${percentage * CIRCUMFERENCE * 0.25} ${CIRCUMFERENCE}`} />
      </svg>
    </div>
  );
};