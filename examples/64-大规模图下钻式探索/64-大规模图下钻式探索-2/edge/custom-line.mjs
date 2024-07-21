export default function(animateOpacity, duration, virtualEdgeOpacity) {
    // Custom the line edge for single edge between one node pair
    G6.registerEdge(
        "custom-line",
        {
            setState: (name, value, item) => {
                const group = item.get("group");
                const model = item.getModel();
                if (name === "focus") {
                    const keyShape = group.find(
                        ele => ele.get("name") === "edge-shape"
                    );
                    const back = group.find(
                        ele => ele.get("name") === "back-line"
                    );
                    if (back) {
                        back.stopAnimate();
                        back.remove();
                        back.destroy();
                    }
                    const arrow = model.style.endArrow;
                    if (value) {
                        if (keyShape.cfg.animation) {
                            keyShape.stopAnimate(true);
                        }
                        keyShape.attr({
                            strokeOpacity: animateOpacity,
                            opacity: animateOpacity,
                            stroke: "#fff",
                            endArrow: {
                                ...arrow,
                                stroke: "#fff",
                                fill: "#fff"
                            }
                        });
                        if (model.isReal) {
                            const { path, stroke, lineWidth } = keyShape.attr();
                            const back = group.addShape("path", {
                                attrs: {
                                    path,
                                    stroke,
                                    lineWidth,
                                    opacity: animateBackOpacity
                                },
                                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                                name: "back-line"
                            });
                            back.toBack();
                            const length = keyShape.getTotalLength();
                            keyShape.animate(
                                ratio => {
                                    // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
                                    const startLen = ratio * length;
                                    // Calculate the lineDash
                                    const cfg = {
                                        lineDash: [startLen, length - startLen]
                                    };
                                    return cfg;
                                },
                                {
                                    repeat: true, // Whether executes the animation repeatly
                                    duration // the duration for executing once
                                }
                            );
                        } else {
                            const lineDash = keyShape.attr("lineDash");
                            const totalLength = lineDash[0] + lineDash[1];
                            let index = 0;
                            keyShape.animate(
                                () => {
                                    index++;
                                    if (index > totalLength) {
                                        index = 0;
                                    }
                                    const res = {
                                        lineDash,
                                        lineDashOffset: -index
                                    };
                                    // returns the modified configurations here, lineDash and lineDashOffset here
                                    return res;
                                },
                                {
                                    repeat: true, // whether executes the animation repeatly
                                    duration // the duration for executing once
                                }
                            );
                        }
                    } else {
                        keyShape.stopAnimate();
                        const stroke = "#acaeaf";
                        const opacity = model.isReal
                            ? realEdgeOpacity
                            : virtualEdgeOpacity;
                        keyShape.attr({
                            stroke,
                            strokeOpacity: opacity,
                            opacity: opacity,
                            endArrow: {
                                ...arrow,
                                stroke,
                                fill: stroke
                            }
                        });
                    }
                }
            }
        },
        "single-edge"
    );
}
