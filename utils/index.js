export const colors = {
    PRIMARY_COLOR: '#5BC0BE',
    GREY_COLOR: '#e0e0e0',
    SECONDARY_COLOR: '#C05B5D',
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

export function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
};

export const calculateMiddleColor = ({
    color1 = colors.GREY_COLOR,
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