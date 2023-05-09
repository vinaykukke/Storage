import React, { useContext, useMemo } from "react";
import { S3Client } from "@aws-sdk/client-s3";

interface IContext {
  s3: S3Client;
}

/** Auth Context */
const S3Context = React.createContext<IContext | null>(null);

export const useS3 = () => useContext<IContext>(S3Context);

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

  const value: IContext = {
    s3,
  };

  return <S3Context.Provider value={value}>{children}</S3Context.Provider>;
};
