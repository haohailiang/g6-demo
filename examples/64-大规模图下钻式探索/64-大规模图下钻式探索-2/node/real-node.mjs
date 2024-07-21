import { isNumber, isArray } from "../util.mjs";

export default function(global) {
    // Custom real node
    G6.registerNode(
        "real-node",
        {
            draw(cfg, group) {
                let r = 30;
                if (isNumber(cfg.size)) {
                    r = cfg.size / 2;
                } else if (isArray(cfg.size)) {
                    r = cfg.size[0] / 2;
                }
                const style = cfg.style || {};
                const colorSet = cfg.colorSet || colorSets[0];

                // halo for hover
                group.addShape("circle", {
                    attrs: {
                        x: 0,
                        y: 0,
                        r: r + 5,
                        fill: style.fill || colorSet.mainFill || "#2B384E",
                        opacity: 0.9,
                        lineWidth: 0
                    },
                    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                    name: "halo-shape",
                    visible: false
                });

                // focus stroke for hover
                group.addShape("circle", {
                    attrs: {
                        x: 0,
                        y: 0,
                        r: r + 5,
                        fill: style.fill || colorSet.mainFill || "#2B384E",
                        stroke: "#fff",
                        strokeOpacity: 0.85,
                        lineWidth: 1
                    },
                    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                    name: "stroke-shape",
                    visible: false
                });

                const keyShape = group.addShape("circle", {
                    attrs: {
                        ...style,
                        x: 0,
                        y: 0,
                        r,
                        fill: colorSet.mainFill,
                        stroke: colorSet.mainStroke,
                        lineWidth: 2,
                        cursor: "pointer"
                    },
                    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                    name: "aggregated-node-keyShape"
                });

                let labelStyle = {};
                if (cfg.labelCfg) {
                    labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
                }

                if (cfg.label) {
                    const text = cfg.label;
                    let labelStyle = {};
                    let refY = 0;
                    if (cfg.labelCfg) {
                        labelStyle = Object.assign(
                            labelStyle,
                            cfg.labelCfg.style
                        );
                        refY += cfg.labelCfg.refY || 0;
                    }
                    let offsetY = 0;
                    const fontSize =
                        labelStyle.fontSize < 8 ? 8 : labelStyle.fontSize;
                    const lineNum = cfg.labelLineNum || 1;
                    offsetY = lineNum * (fontSize || 12);
                    group.addShape("text", {
                        attrs: {
                            text,
                            x: 0,
                            y: r + refY + offsetY + 5,
                            textAlign: "center",
                            textBaseLine: "alphabetic",
                            cursor: "pointer",
                            fontSize,
                            fill: "#fff",
                            opacity: 0.85,
                            fontWeight: 400,
                            stroke: global.edge.labelCfg.style.stroke
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                        name: "text-shape",
                        className: "text-shape"
                    });
                }

                // tag for new node
                if (cfg.new) {
                    group.addShape("circle", {
                        attrs: {
                            x: r - 3,
                            y: -r + 3,
                            r: 4,
                            fill: "#6DD400",
                            lineWidth: 0.5,
                            stroke: "#FFFFFF"
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                        name: "typeNode-tag-circle"
                    });
                }

                return keyShape;
            },
            setState: (name, value, item) => {
                const group = item.get("group");
                if (name === "layoutEnd" && value) {
                    const labelShape = group.find(
                        e => e.get("name") === "text-shape"
                    );
                    if (labelShape) labelShape.set("visible", true);
                } else if (name === "hover") {
                    if (item.hasState("focus")) {
                        return;
                    }
                    const halo = group.find(
                        e => e.get("name") === "halo-shape"
                    );
                    const keyShape = item.getKeyShape();
                    const colorSet = item.getModel().colorSet || colorSets[0];
                    if (value) {
                        halo && halo.show();
                        keyShape.attr("fill", colorSet.activeFill);
                    } else {
                        halo && halo.hide();
                        keyShape.attr("fill", colorSet.mainFill);
                    }
                } else if (name === "focus") {
                    const stroke = group.find(
                        e => e.get("name") === "stroke-shape"
                    );
                    const label = group.find(
                        e => e.get("name") === "text-shape"
                    );
                    const keyShape = item.getKeyShape();
                    const colorSet = item.getModel().colorSet || colorSets[0];
                    if (value) {
                        stroke && stroke.show();
                        keyShape.attr("fill", colorSet.selectedFill);
                        label && label.attr("fontWeight", 800);
                    } else {
                        stroke && stroke.hide();
                        keyShape.attr("fill", colorSet.mainFill); // '#2B384E'
                        label && label.attr("fontWeight", 400);
                    }
                }
            },
            update: undefined
        },
        "aggregated-node"
    ); // 这样可以继承 aggregated-node 的 setState
}
