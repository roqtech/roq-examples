import { ActionTypeEnum, GlobalContext } from '../context';
import { PropsWithChildren, useReducer } from 'react';
import { roqThemeLight } from '../styles/roq-theme';
import { GlobalContextInterface } from '../context/global.context';


function globalStateReducer(state: GlobalContextInterface['state'], action: { type: ActionTypeEnum }) {
    switch (action.type) {
        case ActionTypeEnum.SET_CUSTOM_THEME: {
            return { theme: roqThemeLight }
        }
        case ActionTypeEnum.UN_SET_CUSTOM_THEME: {
            return { theme: undefined }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export const GlobalProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(globalStateReducer, { theme: undefined })
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>
    )
}
