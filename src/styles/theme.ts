export default {
  colors: {
    green20: '#4daa67',
    green30: 'rgba(69, 145, 64, 0.2)',
    green40: '#459140',
    green50: '#356D31',
    green60: '#5ded9f',

    lightGreen: '#04C900',

    blue30: 'rgba(51, 111, 197, 0.2)',
    blue40: '#336FC5',
    lightBlue: '#005CE6',

    yellow30: 'rgba(255, 228, 64, 0.2)',
    yellow40: '#F1BE2B',
    lightYellow: '#EDD500',

    red30: 'rgba(255, 64, 64, 0.2)',
    red40: '#FF4040',
    red50: '#992323',
    lightRed: '#FE0000',

    pink: '#E85D75',
    orange: '#E28413',
    orange40: '#ED7D39',

    cyan: '#AEE5D8',

    deepPurple: '#4E4187',

    black: '#000000',
    grey10: '#E6E6E6',
    grey20: '#CCCCCC',
    grey30: '#B3B3B3',
    grey40: '#999999',
    grey50: '#7F7F7F',
    grey70: '#4D4D4D',
    greyA40: '#F2F2F2',

    white: '#FFFFFF',

    gradientPrimaryInit: '#337AB7',
    gradientPrimaryEnd: '#28A745',
    gradientPrimary: 'rgba(51, 111, 197, 0.1)',

    gradientSecondaryInit: 'rgba(51, 111, 197, 0.3)',
    gradientSecondaryEnd: 'rgba(69, 145, 64, 0.3)',
  },
  patterns: {
    gradientPrimary: () => {
      return `linear-gradient(116.82deg, #58bbff 0%, #5ded9f 100%);`;
    },
    inputGradient: () => {
      return `
        linear-gradient(white, white),
        radial-gradient(circle at top left,  #58bbff 0%, #5ded9f 100%);
      `;
    },
    gradientSecondary: () => {
      return ` linear-gradient(116.82deg, rgba(163, 10, 16, 0.3) 0%, rgba(215, 25, 32, 0.3) 55.21%, rgba(237, 125, 57, 0.3) 100%);`;
    },
    hover: () => {
      return `0px 1px 3px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)`;
    },
    textGradient: () => {
      return `linear-gradient(116.82deg, #58bbff 0%, #5ded9f 100%);`;
    },
  },
  table: {
    status: (value: string) => {
      switch (value) {
        case 'success':
          return '#04C900';
        case 'warning':
          return '#EDD500';
        case 'error':
          return '#FE0000';
        default:
          return '#FE0000';
      }
    },
  },
  header: {
    status: (value: string) => {
      switch (value) {
        case 'success':
          return '#45914033';
        case 'info':
          return '#336FC533';
        case 'warning':
          return '#FFE44033';
        case 'error':
          return '#FF404033';
        default:
          return '#336FC533';
      }
    },
  },
  title: {
    status: (value: string) => {
      switch (value) {
        case 'success':
          return '#459140';
        case 'info':
          return '#336FC5';
        case 'warning':
          return '#F1BE2B';
        case 'error':
          return '#FF4040';
        default:
          return '#336FC533';
      }
    },
  },
  fonts: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Black',

    secondaryRegular: 'Poppins-Regular',
    secondaryMedium: 'Poppins-Medium',
    secondaryBold: 'Poppins-Bold',
  },
};
