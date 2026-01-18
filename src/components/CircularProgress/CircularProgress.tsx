import "./CircularProgress.css"

function CircularProgress() {
  const radius = 12;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg className="ProgressRoot" width={30} height={30}>
      <circle
        cx="15"
        cy="15"
        r={radius}
        stroke="#ddd"
        strokeWidth={stroke}
        fill="none"
        className="ProgressCircle"
      />
      <circle
        cx="15"
        cy="15"
        r={radius}
        stroke="#fff"
        strokeWidth={stroke}
        fill="none"
        className="ProgressCircle ProgressIndicator"
        style={{
          strokeDasharray: circumference,
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="7"
        fill="#000"
      >
      </text>
    </svg>
  );
}
export default CircularProgress;