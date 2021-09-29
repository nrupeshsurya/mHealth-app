export const colors = {
    PRIMARY_COLOR: '#2fc4c1',
    PRIMARY_LIGHT_COLOR: '#98e6e5',
    SECONDARY_COLOR: '#b84749',
    SECONDARY_LIGHT_COLOR: '#dba3a4',
    BORDER_COLOR: '#494850',
    DISABLED_BUTTON_COLOR: '#DCDCDC',

}

export const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    fillShadowGradient: colors.PRIMARY_COLOR,
    fillShadowGradientOpacity: 0.9,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16
    }
};

export const calculateMiddleColor = ({
    color1 = colors.PRIMARY_LIGHT_COLOR,
    color2 = colors.PRIMARY_COLOR,
    ratio,
}) => {
    color1 = color1.substr(1);
    color2 = color2.substr(1);
    const hex = (color) => {
        const colorString = color.toString(16);
        return colorString.length === 1 ? `0${colorString}` : colorString;
    };

    const r = Math.ceil(
        parseInt(color2.substring(0, 2), 16) * ratio
        + parseInt(color1.substring(0, 2), 16) * (1 - ratio),
    );
    const g = Math.ceil(
        parseInt(color2.substring(2, 4), 16) * ratio
        + parseInt(color1.substring(2, 4), 16) * (1 - ratio),
    );
    const b = Math.ceil(
        parseInt(color2.substring(4, 6), 16) * ratio
        + parseInt(color1.substring(4, 6), 16) * (1 - ratio),
    );

    return hex(r) + hex(g) + hex(b);
};