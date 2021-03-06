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

const primary = neutral[900];
const secondary = '#1ab394';

let theme = createTheme(
  {
    palette: {
      type: 'light',
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
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
      h4: {
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '10px',
      },
      body1: {
        fontSize:13,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          color: 'secondary',
          size: 'small',
          variant: 'contained'
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
            '& .MuiTableCell-root': {
              borderBottom: 'none',
              backgroundColor: primary,
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
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize:'13px',
          }
        },
      },
      // MuiTextField: {
      //   styleOverrides: {
      //     root: {
      //       "& .MuiSelect-select": { 
      //         padding: "4px 8px",
      //         fontSize:'13px'
      //       },
      //       "& .MuiMenuItem-root": { 
      //         fontSize:'13px'
      //       }
      //     }
      //   }
      // },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize:'13px'
          }
        }
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: secondary,
            },
          }
        }
      },

      // MuiStepIcon: {
      //   styleOverrides: {
      //     root: {
      //       "& .active": { color: "#1ab394" },
      //       "& .completed": { color: "green" },
      //       "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" }
      //     }
      //   }
      // },
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