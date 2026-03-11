// ---------------------------------------------------
// Material UI Theme Creator
// ---------------------------------------------------
import { createTheme } from '@mui/material/styles';


// =====================================================
// CUSTOM APPLICATION THEME
// Defines global colors, typography, spacing and breakpoints
// =====================================================
const theme = createTheme({

  // ---------------------------------------------------
  // Color Palette
  // These colors are used throughout the application
  // ---------------------------------------------------
  palette: {

    // Primary color (main UI elements)
    success: {
      main: '#3BB143',     // main green color
      light: '#50C878',    // lighter variant
      dark: '#0B6623',     // darker variant
      contrastText: '#fff' // text color used on primary background
    },

    // Error color (used for error messages, delete buttons, etc.)
    error: {
      main: '#ff0000',
      light: '#ff4c4c',
      dark: '#990000',
      
    },

    // Custom tertiary color (used for edit buttons etc.)
    secondary: {
      main: '#FD9402',
      light: '#FDA902',
      dark: '#FD6A02',
      
    },
    //Custom fourth color 
    primary: {
      main: '#3E454B',
      light: '#7A8288',
      dark: '#262A2E',
    },
    //You can add more custom colors here as needed, just follow the same structure
  },


  // ---------------------------------------------------
  // Typography Settings
  // Defines the default fonts used in the app
  // ---------------------------------------------------
  typography: {
    fontFamily: [
      'Clash Display' // primary font
      ,'Satoshi' // fallback font
      ,'-apple-system' // system font for Apple devices
      ,'BlinkMacSystemFont' // system font for MacOS
      ,'Segoe UI' // system font for Windows
      ,'Roboto' // default MUI font
    ].join(','),
  },


  // ---------------------------------------------------
  // Spacing System
  // Default unit = 8px
  // Example usage: theme.spacing(2) → 16px
  // ---------------------------------------------------
  spacing: 8,


  // ---------------------------------------------------
  // Responsive Breakpoints
  // Controls screen size breakpoints for responsive design
  // ---------------------------------------------------
  breakpoints: {
    values: {
      xs: 0,     // extra small devices
      sm: 600,   // small devices
      md: 960,   // tablets
      lg: 1280,  // desktops
      xl: 1920   // large screens
    },
  },

});


// Export theme so it can be used in ThemeProvider
export default theme;