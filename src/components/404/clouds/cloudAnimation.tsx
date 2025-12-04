import Image from "next/image";
import styles from "./CloudAnimation.module.css";

/**
 * Renders a full-viewport decorative cloud background.
 *
 * The element is non-interactive and intended purely for visual decoration.
 *
 * @returns A JSX element containing the cloud background
 */
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