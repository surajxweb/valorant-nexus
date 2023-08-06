import Image from "next/image";
import logo from "../resources/translogo.png";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo" height={60} width={60} />
      </div>
      <div className={styles.name}>Eaglekai&apos;s Valorant App</div>
      <ul className={styles.links}>
        <Link href={"/"}>
          <li className={styles.link}>Home</li>
        </Link>
        <Link href={"/agents"}>
          <li className={styles.link}>Agents</li>
        </Link>
        <Link href={"/maps"}>
          <li className={styles.link}>Maps</li>
        </Link>
        <Link href={"/players"}>
          <li className={styles.link}>Players</li>
        </Link>
      </ul>
    </div>
  );
}
