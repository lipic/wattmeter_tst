class powerChart{constructor(e){this.refresher=e}getConfig(){var e="#828389";return{type:"line",data:{labels:[],datasets:[{pointRadius:0,label:translate("power")+" [W]",color:e,backgroundColor:(0,Chart.helpers.color)("#34ECE1").alpha(0).rgbString(),borderColor:"#34ECE1",fill:0,lineTension:0,data:[]}]},options:{legend:{position:"top",labels:{boxWidth:0,fontColor:e,fontSize:16}},maintainAspectRatio:!1,responsive:!0,scales:{xAxes:[{type:"realtime",realtime:{duration:36e5,refresh:6e4,delay:2e3,onRefresh:this.refresher},ticks:{fontColor:e,fontSize:16},gridLines:{display:!1}}],yAxes:[{scaleLabel:{display:!0,fontColor:e},gridLines:{display:!1},ticks:{fontColor:e,fontSize:16,suggestedMax:500}}]},tooltips:{mode:"nearest",intersect:!1},hover:{mode:"nearest",intersect:!1}}}}}