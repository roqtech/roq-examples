import styles from 'pages/ui/custom-theme.module.css';
import palettes from 'pages/ui/palettes-data.json';
import { ActionTypeEnum, GlobalContext } from 'context';
import { useCallback, useContext } from 'react';
import { createCustomTheme } from '@roq/ui-react';
import { roqThemeLight } from 'styles/roq-theme';
import { PaletteCard, PaletteInterface } from 'components/palette-card';

function CustomTheme() {
    const { state, dispatch } = useContext(GlobalContext);

    const onReset = useCallback(
        () => {
            dispatch({
                type: ActionTypeEnum.UN_SET_CUSTOM_THEME,
            })
        },
        [dispatch],
    );

    const onSelect = useCallback((palette: PaletteInterface) => {
        dispatch({
            type: ActionTypeEnum.SET_CUSTOM_THEME,
            payload: {
                theme: createCustomTheme({
                    ...roqThemeLight,
                    base: {
                        ...roqThemeLight.base,
                        primary: `#${palette.primary.hex}`,
                        secondary: `#${palette.secondary.hex}`,
                        border: `#${palette.third.hex}`,
                        separator: `#${palette.forth.hex}`,
                    },
                })
            }
        })
    }, [dispatch]);

    return (
        <>
            <div className={styles.headRow}>
                <div className={styles.headingContainer}>
                    <h2>Select Palette For Custom Theme</h2>
                </div>
                <div className={styles.headAction}>
                    <div
                        className={styles.button}
                        data-disabled={!state.theme?.name}
                        onClick={() => onReset()}
                    >Reset
                    </div>
                </div>
            </div>
            <div className={styles.page}>
                <div className={styles.feed}>
                    {
                        palettes.map((palette, index) => (
                            <PaletteCard palette={palette} index={index} key={index} onSelect={onSelect}
                                         isSelected={state?.theme?.base?.primary === `#${palette.primary.hex}`}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default CustomTheme;
