const PATHS = {
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41',
    moon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
    user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    settings: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
    home: 'M3 11l9-8 9 8M5 10v10h14V10',
    bag: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    box: 'M21 8l-9-5-9 5v8l9 5 9-5zM3.3 7.5L12 12.5l8.7-5M12 22V12.5',
    receipt: 'M4 2v20l3-2 3 2 3-2 3 2 3-2 1 .7V2l-1 .7L17 2l-3 2-3-2-3 2-3-2zM8 8h8M8 12h8',
    trash: 'M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6',
    refresh: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
    logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
    arrow: 'M5 12h14M13 5l7 7-7 7',
    check: 'M20 6L9 17l-5-5',
    check2: 'M5 13l4 4L19 7',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    undo: 'M3 7v6h6M3 13a9 9 0 1 0 3-7.7L3 8',
    truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18.5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
    coins: 'M12 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 9.5C9 8.1 10.3 7 12 7s3 1.1 3 2.5S13.7 12 12 12s-3 1.1-3 2.5S10.3 17 12 17s3-1.1 3-2.5',
    plus: 'M12 5v14M5 12h14',
    minus: 'M5 12h14',
    close: 'M18 6L6 18M6 6l12 12',
    openEye: 'M3 3l18 18M10.58 10.58a2 2 0 002.84 2.84M9.88 5.09A9.77 9.77 0 0112 5c4.48 0 8.27 2.94 9.54 7a9.97 9.97 0 01-3.17 4.62M6.61 6.61A9.97 9.97 0 002.46 12c1.27 4.06 5.06 7 9.54 7 1.7 0 3.3-.42 4.7-1.17',
    closedEye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
} as const;

export type IconName = keyof typeof PATHS;
type strokeLineCapType = "butt" | "round" | "square" | "inherit" | undefined;
type strokeLineJoinType = "round" | "inherit" | "miter" | "bevel" | undefined;


interface IconProps {
    iconName: IconName;
    size?: number;
    properties?: {
        classes?: string | null,
        fill?: string,
        viewBox?: string,
        stroke?: string,
        strokeWidth?: string,
        strokeLinecap?: strokeLineCapType,
        strokeLinejoin?: strokeLineJoinType
    };
}

const Icon = ({ iconName, size = 20, properties }: IconProps) => {
    return (
        <svg
            className={properties?.classes ? `icon ${properties.classes}` : "icon"}
            width={size}
            height={size}
            viewBox={properties?.viewBox ? `${properties.viewBox}` : "0 0 24 24"}
            fill={properties?.fill ? `${properties.fill}` : "none"}
            stroke={properties?.stroke ? `${properties.stroke}` : "currentColor"}
            strokeWidth={properties?.strokeWidth ? `${properties.strokeWidth}` : "1.8"}
            strokeLinecap={properties?.strokeLinecap ? `${properties.strokeLinecap}` : "round"}
            strokeLinejoin={properties?.strokeLinejoin ? `${properties.strokeLinejoin}` : "round"}
            aria-hidden="true"
            focusable="false">
            <path d={PATHS[iconName]} />
        </svg>
    );
};

export default Icon;