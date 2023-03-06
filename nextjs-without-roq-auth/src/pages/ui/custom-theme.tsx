import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import styles from 'pages/ui/custom-theme.module.css';
import palettes from 'pages/ui/palettes-data.json';
import clsx from 'clsx';
import { ActionTypeEnum, GlobalContext } from '../../context';
import { useCallback, useContext } from 'react';
import { createCustomTheme } from '@roq/nextjs';
import { roqThemeLight } from '../../styles/roq-theme';

interface PaletteColorInterface {
    rgb: string[],
    hex: string
}

interface PaletteInterface {
    primary: PaletteColorInterface,
    secondary: PaletteColorInterface,
    third: PaletteColorInterface,
    forth: PaletteColorInterface
}

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

    console.log(state?.theme?.name);
    return (
        <AppLayout title="UI" description="Custom Theme">
            <DemoLayout>
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
                                <div className={styles.item}
                                     key={`${index}`}
                                     data-index={index}
                                     style={{ animationDelay: `${index * 30}ms` }}>
                                    <div className={styles.palette}>
                                        {
                                            Object.entries(palette).reverse().map(([key, { hex, rgb }], subIndex) => (
                                                <div
                                                    key={`${subIndex}`}
                                                    className={clsx(styles.place, styles[`c${3 - subIndex}`])}
                                                    style={{ backgroundColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` }}
                                                >
                                                    <span data-copy={`#${hex}`}>#{hex}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className={styles.flex}>
                                        <div className={styles.actions}>
                                            <div className={styles.button} onClick={() => onSelect(palette)}>
                                                {
                                                    state?.theme?.base?.primary === `#${palette.primary.hex}` ?
                                                        `Selected` : `Select`
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </DemoLayout>
        </AppLayout>
    );
}

export default CustomTheme;
