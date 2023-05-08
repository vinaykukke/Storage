import React, { useContext, useMemo } from "react";
import { S3Client } from "@aws-sdk/client-s3";

/** Auth Context */
const S3Context = React.createContext(null);

export const useS3 = () => useContext(S3Context);

export const S3Provider = ({ children }) => {
  const s3 = useMemo(
    () =>
      new S3Client({
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
        },
        region: process.env.NEXT_PUBLIC_AWS_REGION,
      }),
    []
  );

  const value = {
    s3,
  };

  return <S3Context.Provider value={value}>{children}</S3Context.Provider>;
};
