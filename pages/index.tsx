import { useEffect, useState } from "react";
import { ListObjectsCommand, ListObjectsOutput } from "@aws-sdk/client-s3";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useS3 } from "src/context/S3provider";
import MediaCard from "components/File";

export default function Home() {
  const { s3 } = useS3();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<ListObjectsOutput["Contents"]>([]);

  useEffect(() => {
    const api = async () => {
      setLoading(true);
      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
        Delimiter: "/",
        // Key: "D004_C015_0425A1_002.R3D",
      };
      try {
        const command = new ListObjectsCommand(params);
        const res = await s3.send(command);
        // const str = await res.Body.transformToString();
        if (res.Contents?.length > 0) setFiles(res.Contents);
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
        {!loading &&
          files.length > 0 &&
          files.map((file, i) => <MediaCard key={i} name={file.Key} />)}
      </main>
    </div>
  );
}
