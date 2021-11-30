import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const navBarFontSize = '.688rem';

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
      },
      sideBar: {
        fontSize:navBarFontSize,
        fontWeight:600,
      },
      sideBarProfile: {
        color: '#8095a8',
        fontSize: navBarFontSize,
        display: 'block',
      }
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: '0 0 0 5px',
            fontSize: navBarFontSize,
            backgroundColor: '#FFF',
          }
        }
      },
    }
  }
 );

theme = responsiveFontSizes(theme);

export default theme;