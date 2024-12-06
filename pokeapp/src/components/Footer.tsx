import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
// import WhatshotIcon from '@mui/icons-material/Whatshot'; // Wild Pokémon
// import GroupIcon from '@mui/icons-material/Group'; // Pokémon Party
import StorageIcon from '@mui/icons-material/Storage'; // PC Box
import { useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = () => {
    switch (location.pathname) {
      case '/party':
        return 1;
      case '/pcbox':
        return 2;
      default:
        return 0;
    }
  };

  const [value, setValue] = React.useState(getValue());

  React.useEffect(() => {
    setValue(getValue());
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 1:
        navigate('/party');
        break;
      case 2:
        navigate('/pcbox');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height:'8vh' }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Wild" /* icon={<WhatshotIcon />} */ 
            icon={<img height='30px' src={"/icons/grass-svgrepo-com.svg"} alt={"hierba"} />}
        />
        <BottomNavigationAction label="Party"/*  icon={<GroupIcon />} */ 
            icon={<img height='25px' src={"/icons/backpack-bag-holidays-svgrepo-com.svg"} alt={"hierba"} />}
        />
        <BottomNavigationAction label="PC Box" icon={<StorageIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
