class powerChart {
    constructor(e) {
        this.refresher = e;
    }
    getConfig() {
        var e = "rgb(255, 0, 0)";
        return {
            type: "line",
            data: { 
                labels: [], 
                datasets: [{ 
                    label: "Power [W]", 
                    color: "#DCDCDC", 
                    backgroundColor: (0, Chart.helpers.color)(e).alpha(0.6).rgbString(), 
                    borderColor: e, 
                    fill: !0, 
                    lineTension: 0, 
                    borderDash: [8, 4], 
                    data: [] 
                }] 
            },
            options: {
                //legend: { labels: { fontColor: "#DCDCDC", fontSize: 14 } },
               // maintainAspectRatio: !1,
               // responsive: !0,
                scales: {
                    x: { 
                        type: 'realtime', 
                        realtime: { 
                            duration: 36e5, 
                            refresh: 6e4, 
                            delay: 2e3,
                            pause: false,     // chart is not paused
                            ttl: undefined, 
                            onRefresh:this.refresher
                        }, 
                        /*ticks: { 
                            fontColor: "#DCDCDC", 
                            fontSize: 14 
                        }*/
                    },
                   /* y: { 
                        scaleLabel: { 
                            display: !0, 
                            labelString: "W", 
                            fontColor: "#DCDCDC" 
                        }, gridLines: { 
                            color: "#DCDCDC", 
                            lineWidth: 0.2 
                        }, ticks: { 
                            fontColor: "#DCDCDC", 
                            fontSize: 14, 
                            suggestedMax: 500 
                        } 
                    },*/
                },
                tooltips: { mode: "nearest", intersect: !1 },
                hover: { mode: "nearest", intersect: !1 },
            },
        };
    }
}
