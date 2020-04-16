
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
let delays = 80,
    durations = 500;
let delays2 = 80,
    durations2 = 500;


export const line={
        options: {
                lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                }),
                height: "40vh",
                low: 0,
                high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                }
        },
        // for animation
        animation: {
                draw: function(data) {
                        if (data.type === "line" || data.type === "area") {
                                data.element.animate({
                                        d: {
                                                begin: 600,
                                                dur: 700,
                                                from: data.path
                                                    .clone()
                                                    .scale(1, 0)
                                                    .translate(0, data.chartRect.height())
                                                    .stringify(),
                                                to: data.path.clone().stringify(),
                                                easing: Chartist.Svg.Easing.easeOutQuint
                                        }
                                });
                        } else if (data.type === "point") {
                                data.element.animate({
                                        opacity: {
                                                begin: (data.index + 1) * delays,
                                                dur: durations,
                                                from: 0,
                                                to: 1,
                                                easing: "ease"
                                        }
                                });
                        }
                }
        }

};

export const bar = {
        options: {
                axisX: {
                        showGrid: false,
                        scaleMinSpace: 15
                },
                height: "30vh",
                low: 0,
                high: 1000,
                chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                }
        },
        responsiveOptions: [
                [
                        "screen and (max-width: 640px)",
                        {
                                seriesBarDistance: 2,
                                axisX: {
                                        labelInterpolationFnc: function(value) {
                                                return value[0];
                                        }
                                }
                        }
                ]
        ],
        animation: {
                draw: function(data) {
                        if (data.type === "bar") {
                                data.element.animate({
                                        opacity: {
                                                begin: (data.index + 1) * delays2,
                                                dur: durations2,
                                                from: 0,
                                                to: 1,
                                                easing: "ease"
                                        }
                                });
                        }
                }
        }
};
