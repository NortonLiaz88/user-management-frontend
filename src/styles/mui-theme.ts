import {createTheme} from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#3F8AE0',
    },
    secondary: {
      main: '#326eb3',
    },
  },
  bg: {
    main: '#fff',
    light: '#F4F5F7',
  },
  text: {
    main: '#172B4D',
    light: '#262930',
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#7F7F7F',
          fontSize: '1.2rem',
        },

        tooltipArrow: {
          backgroundColor: '#7F7F7F',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        text: {
          fontSize: '1.2rem',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        colorSecondary: {
          '&$checked': {
            color: '#7F7F7F',
          },
        },
      },
    },
  },
});
