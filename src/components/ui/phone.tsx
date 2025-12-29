import use3DBorder from "@/hooks/use3DBorder";
import { File } from "lucide-react";

const Phone3D = ({
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  screenContent,
}: {
  children?: React.ReactNode;
  rotateX?: number;
  rotateY?: number;
    rotateZ?: number;
    screenContent?: React.ReactNode;
}) => {
  const { borderRight, borderBottom, borderLeft, borderTop } = use3DBorder(rotateX, rotateY);
  console.log(borderRight, borderBottom, borderLeft, borderTop);


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
        }}
        className="h-full aspect-9/16 bg-[#0A0A0A] rounded-3xl border-[#3B82F6] shadow-lg flex items-center justify-center"
    >
      <div className="w-[97%] h-[98%] bg-[#f2f2f2] rounded-3xl overflow-hidden shadow-inner">
        {screenContent ? screenContent : 
        <div className="w-full h-full flex flex-col justify-center items-center">
            <File fill="bg-black" height={40} width={40}/>
            <p className="text-black">No content</p>
        </div>}
      </div>
    </div>
  );
};

export default Phone3D;
