import { useEffect, useState } from "react";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useS3 } from "src/context/S3provider";

export default function Home() {
  const { s3 } = useS3();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const api = async () => {
      setLoading(true);
      const params = {
        Bucket: "usd-vv",
        Delimiter: "/",
        // Key: "D004_C015_0425A1_002.R3D",
      };
      try {
        const command = new ListObjectsCommand(params);
        const res = await s3.send(command);
        // const str = await res.Body.transformToString();
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    api();
  }, []);

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

      <main className={styles.main}>
        {loading && <div>Loading...</div>}
        {!loading && <div>This is Main component</div>}
      </main>
    </div>
  );
}
