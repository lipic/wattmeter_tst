class energyChart {
    constructor(r, o, e,p) {
        (this.label = o), (this.dim = e), (this.title = r);
    }
    getConfig(r) {
        var delayed = 100;
        for (var o = Chart.helpers.color, e = [], t = [], l = [], a = [], i = 0, d = "#ff0000", s = "#ff0000", C = "#000", n = "#0d6efd"; i < r;) e.push(i++), t.push(0), a.push(0), l.push(0);
        return {
            type: "bar",
            data: {
                datasets: [
                    {
                        label: "\u2193" + this.label,
                        color: "#fff",
                        backgroundColor: [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
                        borderColor: C,
                        borderWidth: 1,
                        hoverBackgroundColor: o(d).alpha(0.5).rgbString(),
                        hoverBorderColor: "#fff",
                        hoverborderWidth: 1,
                        fill: !0,
                        order: 0,
                        data: a,
                    },
                    {
                        label: "\u2191" + this.label,
                        color: "#DCDCDC",
                        backgroundColor: "#d7b410",
                        borderColor: C,
                        borderWidth: 1,
                        hoverBackgroundColor: o(d).alpha(0.5).rgbString(),
                        hoverBorderColor: C,
                        hoverborderWidth: 2,
                        fill: !0,
                        order: 0,
                        data: l,
                    },
                    { type: "line", yAxesGroup: "2", label: "Eavg. [" + this.dim + "]", backgroundColor: o(s).alpha(1).rgbString(), borderColor: s, borderWidth: 2, fill: !1, order: 1, data: [0]},
                ],
                labels: e,
            },
            options: {
                maintainAspectRatio: !1,
                elements: {
                    point:
                    {
                        radius: 0.5
                    }
                },
                plugins: {  // 'legend' now within object 'plugins {}'
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: "#DCDCDC",
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
                scales: {
                    y: { 
                        ticks: {
                            color: "#DCDCDC",                   
                            font: {
                                size: 14, // 'size' now within object 'font {}'
                            },
                            //stepSize: auto,
                            beginAtZero: true
                        },
                        grid: {
                            color: "#7e7e7e",
                            borderColor: "#7e7e7e", 
                            zeroLineWidth: 1
                        }
                    },
                    x: { 
                        ticks: {
                            color: "#DCDCDC",
                            font: {
                                size: 14
                            },
                            beginAtZero: true,
                        },
                        grid: {
                            display:false
                        }
                    }
                }
            }
        };
    }
}
class pieEnergyChart {
    constructor(r, o, e) {
        (this.label = o), (this.dim = e), (this.title = r);
    }
    getConfig(r) {
        return {
            type: "doughnut",
            data: {
                labels: ["\u2193" + this.label, "\u2191" + this.label, "Eavg. [" + this.dim + "]"],
                datasets: [
                    {
                        label: this.label,
                        data: [10, 20, 10],
                        borderColor: '#000',
                        backgroundColor: ["#0d6efd", "#d7b410", "#ff0000"],
                        hoverOffset: 4,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {  // 'legend' now within object 'plugins {}'
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: "#DCDCDC",
                            font: {
                                size: 14
                            }
                        }
                    },
                    datalabels: {
                        formatter: (value) => {
                          return value + 'kWh';
                        }
                      }
                },
                tooltips: { mode: "nearest", intersect: !1 },
                hover: { mode: "nearest", intersect: !1 },
            }
        }
    }
}
