import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Storage - File Storage</title>
        <meta
          name="description"
          content="A Media storage solution for VFX and production houses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>This is the main component</main>
    </div>
  );
}
