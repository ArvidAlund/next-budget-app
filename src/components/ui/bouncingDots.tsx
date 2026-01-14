type BouncingDotsProps = {
    color?: string;
    gap?: string;
};
/**
 * A simple bouncing dots loader component.
 * @param color - The color of the dots. Default is black.
 * @param gap - The gap between the dots. Default is 8px.
 * @returns an animated bouncing dots loader component.
 */
const BouncingDots = ({color = "black", gap = "8px"}: BouncingDotsProps) => {
    return (
        <div className="flex items-center justify-center m-2 w-full h-full flex-1" style={{ gap: gap }}>
            <span className="animate-bouncing h-[clamp(0.5rem,10vw,1.5rem)] aspect-square rounded-full" style={{ backgroundColor: color, animationIterationCount: "infinite"  }}></span>
            <span className="animate-bouncing h-[clamp(0.5rem,10vw,1.5rem)] aspect-square rounded-full" style={{ animationDelay: "0.33s", backgroundColor: color, animationIterationCount: "infinite" }}></span>
            <span className="animate-bouncing h-[clamp(0.5rem,10vw,1.5rem)] aspect-square rounded-full" style={{ animationDelay: "0.66s", backgroundColor: color, animationIterationCount: "infinite" }}></span>
        </div>
    );
}
export default BouncingDots;