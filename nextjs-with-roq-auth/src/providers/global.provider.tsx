import { ActionTypeEnum, GlobalContext } from '../context';
import { PropsWithChildren, useReducer } from 'react';
import { roqThemeLight } from '../styles/roq-theme';
import { GlobalContextInterface } from '../context/global.context';

interface ActionInterface {
    type: ActionTypeEnum,
    payload?: Partial<GlobalContextInterface['state']>
}

function globalStateReducer(state: GlobalContextInterface['state'], { type, payload }: ActionInterface) {
    switch (type) {
        case ActionTypeEnum.SET_CUSTOM_THEME: {
            return { ...state, theme: payload?.theme ? payload.theme : roqThemeLight }
        }
        case ActionTypeEnum.UN_SET_CUSTOM_THEME: {
            return { ...state, theme: undefined }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

export const GlobalProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(globalStateReducer, { theme: undefined })
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>
    )
}
