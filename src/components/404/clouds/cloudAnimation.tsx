import Image from "next/image";
import styles from "./CloudAnimation.module.css";

/**
 * Render a full-screen cloud animation background element.
 *
 * This component displays a full-screen image of clouds that serves as a decorative background animation. 
 * It is positioned absolutely to cover the entire viewport and is non-interactive. 
 * @returns A JSX element containing the cloud animation background.
**/
export default function CloudAnimation() {
  return (
    <div className="absolute top-1/4 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className={styles.clouds}>
        <Image
          src="/img/clouds.png"
          alt="Cloud Animation"
          width={1920}
          height={1080}
          className="object-cover scale-130"
        />
        <Image
          src="/img/clouds.png"
          alt="Cloud Animation"
          width={1920}
          height={1080}
          className="object-cover scale-130"
        />
      </div>
    </div>
  );
}
