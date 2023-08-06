import Link from "next/link";
import Image from "next/image";
import styles from "./MapCard.module.css";

export default function MapCard({ name, image, coordinates }) {
  return (
    <>
      {/* <Link href={`/maps/${name.toLowerCase()}`}> */}
      <div className={styles.container}>
        <div className={styles.image}>
          <Image src={image} alt="map image" height={200} width={355.56} />
        </div>
        <h2 className={styles.mapName}>{name}</h2>
        <div className={styles.cord}>{coordinates}</div>
      </div>
      {/* </Link> */}
    </>
  );
}
