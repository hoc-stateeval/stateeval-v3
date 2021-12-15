import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const neutral = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#2f4050',
  1000: '#293846'
};

const navBarFontSize = '.688rem';

let theme = createTheme(
  {
    palette: {
      type: 'light',
      primary: {
        main: '#c2c2c2',
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
      },
      neutral,
    },
    typography: {
      fontSize: 13,
      h2: {
        fontSize:'1.5rem',
        fontWeight: 100,
        lineHeight: 3
      },
      sideBar: {
        fontSize:navBarFontSize,
        fontWeight:600,
        backgroundColor: neutral[900]
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
            fontWeight: 500
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
            '& .MuiTableCell-root': {
              borderBottom: 'none',
              fontSize: '12px',
              backgroundColor: neutral[900],
              color:'#FFF',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: 0.5,
              textTransform: 'uppercase'
            },
            '& .MuiTableCell-paddingCheckbox': {
              paddingTop: 4,
              paddingBottom: 4
            }
          }
        },
      },
      // MuiOutlinedInput: {
      //   styleOverrides: {
      //     input: {
      //       padding: '0 0 0 5px',
      //       fontSize: navBarFontSize,
      //       backgroundColor: '#FFF',
      //     }
      //   }
      // },
    },
  }
 );

theme = responsiveFontSizes(theme);

export default theme;