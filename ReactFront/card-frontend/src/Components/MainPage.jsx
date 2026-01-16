import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';

export default function WordCard({ word, meaning }) {
  return (
    <Card
      sx={{
        width: { xs: '90%', sm: 800 },
        maxWidth: 1000,
        minHeight: 650,
        padding: 4,
        borderRadius: 8,
        boxShadow: 6,
        bgcolor: '#323261',
        color: '#f8f8f2',
        border: '20px solid #595d78',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1">{word}</Typography>
        <Typography variant="h1">{meaning}</Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="large" sx={{ bgcolor: '#2f2f2f', color: 'primary.main' }}>
          Learn more
        </Button>
      </CardActions>
    </Card>

  );
}


