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


  return (
    <div
        style={{
            borderRight,
            borderBottom,
            borderLeft,
            borderTop,
            transform: `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                rotateZ(${rotateZ}deg)
            `,
            transformStyle: "preserve-3d",
            perspective: "1000px",
        }}
        className="h-full aspect-9/16 bg-black rounded-3xl border-3 border-gray-800 shadow-lg flex items-center justify-center"
    >
      <div className="w-[97%] h-[98%] bg-white rounded-2xl overflow-hidden shadow-inner">
        {screenContent ? screenContent : 
        <div className="w-full h-full flex justify-center items-center">
            <File fill="bg-black" height={40} width={40}/>
        </div>}
      </div>
    </div>
  );
};

export default Phone3D;
