export default function Segment({ radius, stroke, rotation, percentage, reversed, background, startC, endC, doneC }) {

  const SIZE = radius + stroke;
  const CIRCUMFERENCE = Math.PI * radius * 8;

  const getColor = (percentage: number) => {
    const r1 = parseInt(startC.slice(1, 3), 16);
    const g1 = parseInt(startC.slice(3, 5), 16);
    const b1 = parseInt(startC.slice(5, 7), 16);

    const r2 = parseInt(endC.slice(1, 3), 16);
    const g2 = parseInt(endC.slice(3, 5), 16);
    const b2 = parseInt(endC.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * percentage);
    const g = Math.round(g1 + (g2 - g1) * percentage);
    const b = Math.round(b1 + (b2 - b1) * percentage);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const foreground = getColor(percentage);

  return (
    <div>
      <svg height={SIZE} width={SIZE} style={{transform: `rotate(${rotation}deg)`}}>
          <circle r={radius} stroke={background} strokeWidth={stroke} fill="transparent" />
          <circle r={radius} stroke={percentage != 1 ? foreground : doneC} strokeWidth={stroke} fill="transparent" pathLength={CIRCUMFERENCE} strokeDasharray={`${percentage * CIRCUMFERENCE * 0.25} ${CIRCUMFERENCE}`} style={reversed ? { transform: `scaleX(-1) rotate(90deg)` } : {}} />
      </svg> 
    </div>
  );
};