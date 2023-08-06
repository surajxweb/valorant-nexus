import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import agentImage from "../resources/1.png";
import mapImage from "../resources/2.png";
import playerImage from "../resources/3.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Valorant Nexus: Unveiling Champions</title>
        <meta
          name="description"
          content="Step into the heart of the action with our eaglekai's Valorant informational site, where he dives deep into the dynamic world of our beloved first-person shooter game. Welcome to the epicenter of Valorant knowledge and unravel the secrets that shape the champions! "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        {" "}
        <Link href={"/agents"}>
          <div className={styles.category}>
            <div className={styles.image}>
              <Image
                src={agentImage}
                alt="player image"
                height={300}
                width={300}
              />
            </div>
            <div className={styles.text}>Agents</div>
          </div>
        </Link>
        <Link href={"/maps"}>
          <div className={styles.category}>
            <div className={styles.image}>
              <Image
                src={mapImage}
                alt="player image"
                height={300}
                width={300}
              />
            </div>
            <div className={styles.text}>Maps</div>
          </div>
        </Link>
        <Link href={"/players"}>
          <div className={styles.category}>
            <div className={styles.image}>
              <Image
                src={playerImage}
                alt="player image"
                height={300}
                width={300}
              />
            </div>
            <div className={styles.text}>Players</div>
          </div>
        </Link>{" "}
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
