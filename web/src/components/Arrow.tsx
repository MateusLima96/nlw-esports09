interface ArrowProps {
    left?: boolean
    onClick: (e: any) => void
}  

export function Arrow(props: ArrowProps) {
  return (
            <svg
                onClick={props.onClick}
                className={`arrow ${props.left ? "arrow--left" : "arrow--right"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                >
                <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#D1D5DB", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#7C3AED", stopOpacity: 1 }} />
                </linearGradient>
                </defs>

                {props.left && (
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996" fill="url(#arrowGradient)" />
                )}
                {!props.left && (
                    <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9" fill="url(#arrowGradient)" />
                )}
            </svg>
    )
  
}