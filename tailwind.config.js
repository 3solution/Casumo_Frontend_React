module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderRadius: {
      none: '0',
      sm: '16px',
      md: '24px',
      lg: '100px',
    },
    colors: {
      white: '#ffffff',
      indigo: {
        30: '#4C00C2',
        60: '#3B058E',
        100: '#32007E',
      },
      grey: '#E5E5E5',
      blue: '#01C9C7',
      dark: {
        10: '#D3D8E1',
        30: '#798291',
        60: '#444E5D',
        90: '#1A212C',
      },
      green: '#19AC51',
      rose: '#FC484C',
    },
    bgColors: {
      white: '#ffffff',
      indigo: {
        30: '#4C00C2',
        60: '#3B058E',
        100: '#32007E',
      },
      grey: '#E5E5E5',
      dark: {
        10: '#D3D8E1',
        30: '#798291',
        60: '#444E5D',
        90: '#1A212C',
      },
      green: '#19AC51',
      rose: '#FC484C',
    },
    fontSize: {
      xs: '10px',
      sm: '14px',
      tiny: '16px',
      base: '24px',
      lg: '30px',
    },
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '40px',
      7: '48px',
      8: '56px',
    },
    extend: {
      minHeight: {
        1000: '1000px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
