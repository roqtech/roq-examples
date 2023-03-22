import { createContext, Dispatch } from 'react'
import { CustomThemeInterface } from '@roq/ui-react/dist/features';

interface ContextState {
    theme: CustomThemeInterface
}

export enum ActionTypeEnum {
    SET_CUSTOM_THEME = 'setCustomTheme',
    UN_SET_CUSTOM_THEME = 'unsetCustomTheme'
}

export interface GlobalContextInterface {
    state: ContextState,
    dispatch: Dispatch<{ type: ActionTypeEnum, payload?: Partial<ContextState> }>,
}

export const GlobalContext = createContext<GlobalContextInterface>({
    state: {
        theme: undefined,
    },
    dispatch: () => {
    },
});
