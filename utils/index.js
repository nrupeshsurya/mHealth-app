export const colors = {
    PRIMARY_COLOR: '#5BC0BE',
    SECONDARY_COLOR: '#494850',
    BORDER_COLOR: '#494850',
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