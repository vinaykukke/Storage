import { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { useS3 } from "src/context/S3provider";

interface IProps {
  name: string;
}

export default function MediaCard(props: IProps) {
  const { s3 } = useS3();
  const [url, setUrl] = useState("");
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const getObjectURL = async () => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
      Key: props.name,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 }); // expires in seconds
    return url;
  };

  useEffect(() => {
    /**
     * Execute the click programatically
     * So that the presigned url doesnt expire
     */
    if (url) downloadRef.current.click();
  }, [url]);

  const handleClick = async () => {
    const url = await getObjectURL();
    setUrl(url);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/video-icon.png"
        title="Video"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" disabled>
          Share
        </Button>
        <Button size="small" onClick={handleClick}>
          Download
          <Link ref={downloadRef} underline="none" href={url} download />
        </Button>
      </CardActions>
    </Card>
  );
}
