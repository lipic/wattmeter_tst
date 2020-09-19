class GaugeSetting{
    constructor(a,b,c){
        this.div=a
        this.max=b
        this.min=c
    } 
    getGauge(){
        var opts = {
            angle: 0, // The span of the gauge arc
            lineWidth: 0.2, // The line thickness
            radiusScale: 0.89, // Relative radius
            pointer: {
              length: 0.54, // // Relative to gauge radius
              strokeWidth: 0.053, // The thickness
              color: '#FFFFFF' // Fill color
            },
            limitMax: false,     // If false, max value increases automatically if value > maxValue
            limitMin: false,     // If true, the min value of the gauge will be fixed
            colorStart: '#6FADCF',   // Colors
            colorStop: '#8FC0DA',    // just experiment with them
            strokeColor: '#E0E0E0',  // to see which ones work best for you
            generateGradient: true,
            highDpiSupport: true,     // High resolution support
            staticZones: [
                {strokeStyle: " #80c904", min: 0, max: this.max/2 -1,height: 1.2}, // Green
                {strokeStyle: " #80c904", min: this.max/2, max: this.max,height: 1.4}, // Green
                {strokeStyle: "#FF0000", min: this.min, max: -1,height: 1}  // Red
             ],
            staticLabels: {
                font: "10px sans-serif",  // Specifies font
                labels: [this.min, 0, this.max/2, this.max],  // Print labels at these values
                color: "#ffffff",  // Optional: Label text color
                fractionDigits: 0  // Optional: Numerical precision. 0=round off.
            }
        };
        var gauge = new Gauge(document.getElementById(this.div)).setOptions(opts); // create sexy gauge!
        gauge.maxValue = this.max; // set max gauge value
        gauge.setMinValue(this.min);  // Prefer setter over gauge.minValue = 0
        gauge.animationSpeed = 50; // set animation speed (32 is default value)
        gauge.set(0)
        return gauge
    }
}