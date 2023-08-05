import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Valorant Nexus: Unveiling Champions</title>
        <meta
          name="description"
          content="Step into the heart of the action with our Valorant informational site, where we dive deep into the dynamic world of our beloved first-person shooter game. Welcome to the epicenter of Valorant knowledge and unravel the secrets that shape the champions! "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>
      <ul>
        <li>
          <Link href={"/agents"}>Agents</Link>
        </li>
        <li>
          <Link href={"/maps"}>Maps</Link>
        </li>
        <li>
          <Link href={"/weapons"}>Weapons</Link>
        </li>
        <li>
          <Link href={"/player"}>Player</Link>
        </li>
      </ul>

      <footer className={styles.footer}></footer>
    </div>
  );
}
