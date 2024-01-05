export default function QuarterCircle ({ size,  }) {
  
  return (
  
    <svg width="100" height="100">
        

        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="none" />
        <circle cx="50" cy="50" r="35" stroke="black" stroke-width="2" fill="none" />
        <circle cx="50" cy="50" r="30" stroke="black" stroke-width="2" fill="none" />
        <rect x="49.5" y="0" width="1" height="100" stroke="white" stroke-width="2" fill="none" />
        <rect x="0" y="49.5" width="100" height="1" stroke="white" stroke-width="2" fill="none" />
    </svg>
  
  );
};