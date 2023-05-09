import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

interface IProps {
  name: string;
}

export default function MediaCard(props: IProps) {
  const getObjectURL = () => {
    const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
    const region = process.env.NEXT_PUBLIC_AWS_REGION;
    return `https://${bucket}.s3.${region}.amazonaws.com/${props.name}`;
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
        <Button size="small">Share</Button>
        <Button size="small">
          <Link underline="none" href={getObjectURL()} download>
            Download
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
