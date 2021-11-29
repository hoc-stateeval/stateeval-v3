import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme(
  {
    palette: {
      type: 'light',
      primary: {
        main: '#2f4050',
      },
      secondary: {
        main: '#1ab394',
        contrastText: '#fff',
      },
      background: {
        default: '#f3f3f4',
        paper: '#FFFFFF'
      },
    },
    typography: {
      fontFamily: [
        'open sans', 
        'Helvetica Neue', 
        'Helvetica', 
        'Arial', 
        'sans-serif',
      ].join(','),
    }
  }
 );

theme = responsiveFontSizes(theme);

export default theme;