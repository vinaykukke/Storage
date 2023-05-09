import { useEffect, useState } from "react";
import {
  // HeadObjectCommand,
  ListObjectsCommand,
  ListObjectsOutput,
} from "@aws-sdk/client-s3";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useS3 } from "src/context/S3provider";
import MediaCard from "components/File";
import { Grid, Typography } from "@mui/material";

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
      };
      try {
        const command = new ListObjectsCommand(params);
        const res = await s3.send(command);

        if (res.Contents?.length > 0) setFiles(res.Contents);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    api();
  }, []);

  // useEffect(() => {
  //   const api = async () => {
  //     try {
  //       const command = new HeadObjectCommand({
  //         Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
  //         Key: "D004_C015_0425A1_002.R3D",
  //       });
  //       const res = await s3.send(command);
  //       console.log(res.Metadata);
  //     } catch (error) {
  //       console.error("Error Fetching object metadata: ", error);
  //     }
  //   };
  //   api();
  // }, []);

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
        <Typography variant="h2" mb={10}>
          Available Items
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {loading && <div>Loading...</div>}
          {!loading &&
            files.length > 0 &&
            files.map((file, i) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={i}>
                <MediaCard key={i} name={file.Key} />
              </Grid>
            ))}
        </Grid>
      </main>
    </div>
  );
}
