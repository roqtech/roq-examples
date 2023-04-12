import React from 'react';
import Select from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';

export const SelectFilter = (
    { value, onChange, options, prefix, ...rest }: StateManagerProps & { prefix?: string }
) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            isClearable={false}
            isSearchable={false}
            isLoading={false}
            options={options}
            styles={{
                container: (curr) => ({
                    ...curr,
                    minWidth: '200px',
                }),
                singleValue: (curr) => ({
                    ...curr,
                    '::before': {
                        content: `"${prefix} "`,
                    }
                }),
                control: (cur, state) => ({
                    ...cur,
                    cursor: 'pointer',
                    border: 'none',
                    borderColor: state.menuIsOpen ? 'var(--roq-user-invite-role-dropdown-boxShadow)' : '',
                    boxShadow: state.menuIsOpen ? '0 0 0 1px var(--roq-user-invite-role-dropdown-boxShadow)' : 'none',
                }),
            }}
            components={{ IndicatorSeparator: () => null }}
            {...rest}
        />
    )

}
