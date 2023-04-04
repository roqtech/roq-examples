import * as React from 'react';

export const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        fill="#000000"
        width="24px"
        height="24px"
        viewBox="0 0 0.72 0.72"
        id="menu"
        data-name="Flat Color"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-color"
        {...props}
    >
        <path
            id="secondary"
            d="M0.63 0.39H0.09a0.03 0.03 0 0 1 0 -0.06h0.54a0.03 0.03 0 0 1 0 0.06Z"
            style={{
                fill: 'rgb(44, 169, 188)',
            }}
        />
        <path
            id="primary"
            d="M0.63 0.57H0.27a0.03 0.03 0 0 1 0 -0.06h0.36a0.03 0.03 0 0 1 0 0.06ZM0.45 0.21H0.09a0.03 0.03 0 0 1 0 -0.06h0.36a0.03 0.03 0 0 1 0 0.06Z"
            style={{
                fill: 'rgb(0, 0, 0)',
            }}
        />
    </svg>
);
