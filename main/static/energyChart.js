class energyChart {
    constructor(r, o, e) {
        (this.label = o), (this.dim = e), (this.title = r);
    }
    getConfig(r) {
        for (var o = Chart.helpers.color, e = [], t = [], l = [], a = [], i = 0, d = "rgb(255, 0, 0)", s = "rgb(205, 78, 98)", C = "rgb(0, 0, 0)", n = "rgb(0, 191, 235)"; i < r; ) e.push(i++), t.push(0), a.push(0), l.push(0);
        return {
            type: "bar",
            data: {
                datasets: [
                    {
                        label: "\u2193" + this.label,
                        color: "#DCDCDC",
                        backgroundColor: [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
                        borderColor: C,
                        borderWidth: 1,
                        hoverBackgroundColor: o(d).alpha(0.5).rgbString(),
                        hoverBorderColor: C,
                        hoverborderWidth: 2,
                        fill: !0,
                        order: 0,
                        data: a,
                    },
                    {
                        label: "\u2191" + this.label,
                        color: "#DCDCDC",
                        backgroundColor: "rgb(255, 255, 0)",
                        borderColor: C,
                        borderWidth: 1,
                        hoverBackgroundColor: o(d).alpha(0.5).rgbString(),
                        hoverBorderColor: C,
                        hoverborderWidth: 2,
                        fill: !0,
                        order: 0,
                        data: l,
                    },
                    { type: "line", yAxesGroup: "2", label: "Eavg. [" + this.dim + "]", backgroundColor: o(s).alpha(1).rgbString(), borderColor: s, borderWidth: 1, fill: !1, order: 1, data: [0] },
                ],
                labels: e,
            },
            options: {
                maintainAspectRatio: !1,
                elements: { point: { radius: 0.5 } },
                legend: { labels: { fontColor: "#DCDCDC", fontSize: 14 } },
                scales: {
                    xAxes: [{ stacked: !0, ticks: { fontColor: "#DCDCDC", fontSize: 13 } }],
                    yAxes: [{ stacked: !0, scaleLabel: { display: !0, labelString: this.dim, fontColor: "#DCDCDC" }, gridLines: { color: "#DCDCDC", lineWidth: 0.2 }, ticks: { fontColor: "#DCDCDC", fontSize: 14, beginAtZero: !0 } }],
                },
                tooltips: { mode: "nearest", intersect: !1 },
                hover: { mode: "nearest", intersect: !1 },
            },
        };
    }
}
class pieEnergyChart{
    constructor(r, o, e) {
        (this.label = o), (this.dim = e), (this.title = r);
        this.DATA_COUNT = 4;
        this.NUMBER_CFG = {count: this.DATA_COUNT, min: 0, max: 100};
    }
    getConfig(r) {
        for (var o = Chart.helpers.color, e = [], t = [], l = [], a = [], i = 0, d = "rgb(255, 0, 0)", s = "rgb(205, 78, 98)", C = "rgb(0, 0, 0)", n = "rgb(0, 191, 235)"; i < r; ) e.push(i++), t.push(0), a.push(0), l.push(0);
        return {
            type: "pie",
            data:   {labels: ['Red', 'Orange', 'Yellow', 'Green'],
            datasets: [
              {
                label: 'Dataset 1',
                data: this.NUMBER_CFG,
                backgroundColor: o(d).alpha(0.5).rgbString(),
              }
              ]
            },
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
            }    
        }      
    }
}
