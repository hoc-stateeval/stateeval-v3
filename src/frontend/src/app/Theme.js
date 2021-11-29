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
      text : {
        primary: '#676a6c'
      }
    },
    typography: {
      fontFamily: [
        'open sans', 
        'Helvetica Neue', 
        'Helvetica', 
        'Arial', 
        'sans-serif',
      ].join(','),
      h2: {
        fontSize:'1.5rem',
        fontWeight: 100,
        lineHeight: 3
      }
    }
  }
 );

theme = responsiveFontSizes(theme);

export default theme;