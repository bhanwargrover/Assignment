export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: {
      light: string;
      dark: string;
    };
    text: {
      light: string;
      dark: string;
    };
    border: string;
    userMessage: string;
    botMessage: string;
    shadow: string;
  };
  sizes: {
    bubbleSize: string;
    windowWidth: string;
    windowHeight: string;
    headerHeight: string;
    borderRadius: string;
  };
  fonts: {
    primary: string;
  };
}

export const defaultTheme: Theme = {
  colors: {
    primary: '#3B82F6', // Blue
    secondary: '#F3F4F6', // Light gray
    background: {
      light: '#FFFFFF',
      dark: '#1F2937',
    },
    text: {
      light: '#1F2937',
      dark: '#F9FAFB',
    },
    border: '#E5E7EB',
    userMessage: '#3B82F6', // Blue
    botMessage: '#F3F4F6', // Light gray
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  sizes: {
    bubbleSize: '60px',
    windowWidth: '360px',
    windowHeight: '520px',
    headerHeight: '60px',
    borderRadius: '16px',
  },
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
};

export const createTheme = (customizations: Partial<Theme> = {}): Theme => {
  return {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...(customizations.colors || {}),
    },
    sizes: {
      ...defaultTheme.sizes,
      ...(customizations.sizes || {}),
    },
    fonts: {
      ...defaultTheme.fonts,
      ...(customizations.fonts || {}),
    },
  };
};