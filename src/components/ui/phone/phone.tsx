import use3DBorder from "@/hooks/use3DBorder";
import { File } from "lucide-react";

const Phone3D = ({
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  screenContent,
  flat = false
}: {
  children?: React.ReactNode;
  rotateX?: number;
  rotateY?: number;
    rotateZ?: number;
    screenContent?: React.ReactNode;
    flat?: boolean;
}) => {
  if (flat) {
    rotateX = 0;
    rotateY = 0;
    rotateZ = 0;
  }
  const { borderRight, borderBottom, borderLeft, borderTop } = use3DBorder(rotateX, rotateY);


  return (
    <div
        style={{
            borderBottomWidth: borderBottom,
            borderRightWidth: borderRight,
            borderLeftWidth: borderLeft,
            borderTopWidth: borderTop,

            transform: `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                rotateZ(${rotateZ}deg)
            `,
            transformStyle: "preserve-3d",
            perspective: "1000px",
            transition: "transform 0.5s ease",
        }}
        className="h-full aspect-9/16 bg-[#0A0A0A] rounded-3xl border-[#404044] shadow-lg flex items-center justify-center pointer-events-none"
    >
      <div className="w-[97%] h-[98%] bg-[#f2f2f2] rounded-3xl overflow-hidden shadow-inner relative pointer-events-auto">
        {screenContent ? screenContent : 
        <div className="w-full h-full flex flex-col justify-center items-center">
            <File fill="bg-black" height={40} width={40}/>
            <p className="text-black">No content</p>
        </div>}
        <span className="absolute top-3 left-1/2 -translate-x-1/2 w-4 aspect-square rounded-full bg-black z-100"/>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-black rounded-full z-100"/>
      </div>
    </div>
  );
};

export default Phone3D;
