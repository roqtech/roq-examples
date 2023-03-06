import { createCustomTheme } from '@roq/nextjs';
import { CustomThemeInterface } from '@roq/ui-react/dist/features';

const customThemOptions: CustomThemeInterface = {
  name: 'ROQ Custom Theme',
  base: {
    primary: '#4FD1C5',
    secondary: '#319795',
    black: '#2D3748',
    card: '#EDF2F7',
    background: '#F7FAFC',
    separator: '#A0AEC0',
    warning: '#F6AD55',
    border: '#718096',
    error: '#FC8181',
    success: '#68D391',
    white: '#F7FAFC',
  },
  spacing: {
    borderRadius: '16px',
  },
  typography: {
    family: '\'Lato\', sans-serif',
  },
};
export const roqThemeLight = createCustomTheme(customThemOptions);

