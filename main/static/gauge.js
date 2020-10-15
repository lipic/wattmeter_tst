class GaugeSetting {
    constructor(a, b, c) {
        this.div = a
        this.max = b
        this.min = c
    }
    getGauge() {
        var opts = {
            angle: 0.15, // The span of the gauge arc
            lineWidth: 0.1, // The line thickness
            radiusScale: 1, // Relative radius
            pointer: {
                length: 1, // // Relative to gauge radius
                strokeWidth: 0.035, // The thickness
                color: '#FFFFFF' // Fill color
            },
            limitMax: true, // If false, max value increases automatically if value > maxValue
            limitMin: true, // If true, the min value of the gauge will be fixed
            colorStart: '#F93900', // Colors
            colorStop: '#FFA500', // just experiment with them
            strokeColor: '#808080', // to see which ones work best for you
            generateGradient: true,
            highDpiSupport: true, // High resolution support
        };
        var gauge = new Donut(document.getElementById(this.div)).setOptions(opts); // create sexy gauge!
        gauge.maxValue = this.max; // set max gauge value
        gauge.setMinValue(this.min); // Prefer setter over gauge.minValue = 0
        gauge.animationSpeed = 1; // set animation speed (32 is default value)
        gauge.set(0)
        return gauge
    }
}