import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButtons from './ToggleBtn';

export default function Header() {
    const cardStyle={
        backgroundColor:'transparent',
        border:'none',
        height:'100%', 
        width:'100%',
        textAlign:'center'

  }
    
  return (
    <Card sx={cardStyle} variant="outlined">
      <CardContent>
        <Typography variant="h4" fontWeight="bold">
          My Tasks
        </Typography>
        <Divider variant='h3' sx={{fontWeight:'bold'}} />
      </CardContent>
      <ToggleButtons />
      

    </Card>
  );
}