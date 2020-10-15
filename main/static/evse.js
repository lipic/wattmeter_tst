class evse {
    constructor(numEvse) { this.numEvse = numEvse; }
    createEvseGauge() {
        for (var i = 1; i <= this.numEvse; i++) {
            ($('<div class="container-sm mt-1 text-center" style="height:250px;">' +
                '<span  class="dim">EVSE ' + i + '</span>' +
                '<div class="text-center">' +
                '<span class="unit" style="font-size: 20px;">EV STATE: </span>' +
                '<span class="value" style="font-size: 20px;" id="EV_STATE' + i + '">-,-</span><br>' +
                '<div class="charging">' +
                '<div class="top"></div>' +
                '<div class="charge' + (1 + ((i - 1) * 4)) + '"></div>' +
                '<div class="charge' + (2 + ((i - 1) * 4)) + '"></div>' +
                '<div class="charge' + (3 + ((i - 1) * 4)) + '"></div>' +
                '<div class="charge' + (4 + ((i - 1) * 4)) + '"></div>' +
                '</div>' +
                '</div>' +
                '<span class="dim" style="position:relative;margin:auto; top:70px;" id="ACTUAL_OUTPUT_CURRENT' + i + '">-,-</span><br>' +
                '<span class="value" style="font-size: 20px; position:relative;margin:auto;" id="ACTUAL_CONFIG_CURRENT' + i + '">-,-</span>' +
                '</div>' +
                '<style>' +
                '.charge' + (1 + ((i - 1) * 4)) + ',.charge' + (2 + ((i - 1) * 4)) + ',.charge' + (3 + ((i - 1) * 4)) + ',.charge' + (4 + ((i - 1) * 4)) + '{width:60px;height:130px;background-color:green;position:relative;}' +
                '.charge' + (1 + ((i - 1) * 4)) + '{bottom:45px;left:5px;animation:charge-1 3s infinite;}' +
                '.charge' + (2 + ((i - 1) * 4)) + '{bottom:175px;left:70px;animation:charge-2 3s infinite;}' +
                '.charge' + (3 + ((i - 1) * 4)) + '{bottom:305px;left:135px;animation:charge-3 3s infinite;}' +
                '.charge' + (4 + ((i - 1) * 4)) + '{bottom:435px;left:200px;animation:charge-4 3s infinite;}' +
                '</style>').appendTo("#evseGauge"));
        }
    }
}