class GaugeSetting{
    constructor(a,b,c){
        this.div=a
        this.max=b
        this.min=c
    } 
    getGauge(){
        var opts = {
              angle: 0.2, // The span of the gauge arc
              lineWidth: 0.15, // The line thickness
              radiusScale: 1, // Relative radius
              pointer: {
                length: 0.6, // // Relative to gauge radius
                strokeWidth: 0.035, // The thickness
                color: '#000000' // Fill color
          },
          limitMax: false,     // If false, max value increases automatically if value > maxValue
          limitMin: false,     // If true, the min value of the gauge will be fixed
          colorStart: '#FFD700',   // Colors
          colorStop: '#DAA520',    // just experiment with them
          strokeColor: '#EEEEEE',  // to see which ones work best for you
          generateGradient: true,
          highDpiSupport: true,     // High resolution support
        };
        var gauge = new Donut(document.getElementById(this.div)).setOptions(opts); // create sexy gauge!
        gauge.maxValue = this.max; // set max gauge value
        gauge.setMinValue(this.min);  // Prefer setter over gauge.minValue = 0
        gauge.animationSpeed = 50; // set animation speed (32 is default value)
        gauge.set(0)
        return gauge
    }
}