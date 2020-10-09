class evse {
    constructor(numEvse) { this.numEvse = numEvse; }
    createEvseGauge() {
        for (var i = 1; i <= this.numEvse; i++) {
            ($('<div class="container-sm mt-1 text-center">' +
                '<span  style="color:#FFA500; font-size: 28px; font-weight: bold;">EVSE ' + i + '</span>' +
                ' <div class="g-container">' +
                ' <div class="g-number">' +
                '<span id="ACTUAL_CONFIG_CURRENT' + i + '">-,-</span><br>' +
                '<span id="EV_STATE' + i + '"style="color:#FFA500;">-,-</span><br>' +
                '<span id="ACTUAL_OUTPUT_CURRENT' + i + '">-,-</span>' +
                '</div> <div class="g-contrast"> <div class="g-circle"></div>  </div></div></div>').appendTo("#evseGauge"));
        }
    }
}