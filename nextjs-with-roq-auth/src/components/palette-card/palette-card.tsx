import styles from '../../pages/ui/custom-theme.module.css';
import clsx from 'clsx';

interface PaletteColorInterface {
    rgb: string[],
    hex: string
}

export interface PaletteInterface {
    primary: PaletteColorInterface,
    secondary: PaletteColorInterface,
    third: PaletteColorInterface,
    forth: PaletteColorInterface
}

export interface PaletteCardProps {
    palette: PaletteInterface;
    index: number,
    onSelect: (palette: PaletteInterface) => void;
    isSelected: boolean
}

export const PaletteCard = (props: PaletteCardProps) => {
    const { palette, index, onSelect, isSelected } = props;
    return (
        <div className={styles.item}
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
                            isSelected ? `Selected` : `Select`
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
