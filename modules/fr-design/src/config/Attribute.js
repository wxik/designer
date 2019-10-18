/**
 * 属性配置
 * @author tangzehua
 * @sine 2019-09-24 16:17
 */

// 设计器事件常量
export const PropsConst = {
    canvasSize: "basic.canvas.size",
    background: "basic.background",
    designGrid: "basic.design.grid",

    //widget basic
    widgetX: "widget.x",
    widgetY: "widget.y",
    widgetWidth: 'widget.width',
    widgetHeight: 'widget.height',
    widgetSize: "widget.size",
    widgetPosition: "widget.position",
    widgetBackground: "widget.background",
    widgetBackgroundHandle: "widget.background.handle",

    // widget layout flex
    layoutDirection: "layout.flex.flexDirection",
    layoutJustifyContent: "layout.flex.justifyContent",
    layoutAlignContent: "layout.flex.alignContent",
    layoutAlignItems: "layout.flex.alignItems",
    layoutAlignSelf: "layout.flex.alignSelf",

    // widget layout padding
    layoutPaddingVL: "layout.setting.padding.vl",
    layoutPaddingHL: "layout.setting.padding.hl",
    layoutPaddingLeft: "layout.padding.paddingLeft",
    layoutPaddingRight: "layout.padding.paddingRight",
    layoutPaddingTop: "layout.padding.paddingTop",
    layoutPaddingBottom: "layout.padding.paddingBottom",

    // widget layout margin
    layoutMarginVL: "layout.setting.margin.vl",
    layoutMarginHL: "layout.setting.margin.hl",
    layoutMarginLeft: "layout.margin.marginLeft",
    layoutMarginRight: "layout.margin.marginRight",
    layoutMarginTop: "layout.margin.marginTop",
    layoutMarginBottom: "layout.margin.marginBottom",

    // widget layout border radius
    layoutRadiusVL: "layout.setting.radius.vl",
    layoutRadiusHL: "layout.setting.radius.hl",
    layoutRadiusTopLeft: "layout.radius.borderTopLeftRadius",
    layoutRadiusTopRight: "layout.radius.borderTopRightRadius",
    layoutRadiusBottomLeft: "layout.radius.borderBottomLeftRadius",
    layoutRadiusBottomRight: "layout.radius.borderBottomRightRadius",

    // widget layout border
    layoutBorderLeft: "layout.border.borderLeftWidth",
    layoutBorderRight: "layout.border.borderRightWidth",
    layoutBorderTop: "layout.border.borderTopWidth",
    layoutBorderBottom: "layout.border.borderBottomWidth",

    // widget mouse
    widgetMouseExit: "widget.mouse.exit",
    widgetMouseEnter: "widget.mouse.enter",
    widgetMouseClick: "widget.mouse.click",
    widgetMouseDBLClick: "widget.mouse.dblclick",
};

// 布局Layout常量
export const LayoutConst = {
    css: {
        normal: 'normal',
    },
    direction: {
        row: 'row',
        column: 'column',
    },
    // flex-start', 'flex-end', 'center', 'stretch', 'baseline'
    alignItem: {
        center: 'center',
        flexStart: 'flex-start',
        flexEnd: 'flex-end',
        stretch: 'stretch', // app:default
        baseline: 'baseline',
    },
    //'flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'
    alignContent: {
        flexStart: 'flex-start',
        flexEnd: 'flex-end',
        center: 'center',
        stretch: 'stretch',
        spaceBetween: 'space-between',
        spaceAround: 'space-around',
    },
    // 'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'
    alignSelf: {
        auto: 'auto',
        flexStart: 'flex-start',
        flexEnd: 'flex-end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
    },
    // 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'
    justifyContent: {
        flexStart: 'flex-start',
        flexEnd: 'flex-end',
        center: 'center',
        spaceEvenly: 'space-evenly',
        spaceBetween: 'space-between',
        spaceAround: 'space-around',
    }

};

// 布局方向常量
export const ArrangeConst = {
    alignTop: 1,
    alignRight: 2,
    alignBottom: 3,
    alignLeft: 4,
    evenlyH: 5,
    evenlyV: 6,
    alignCenterV: 7,
    alignCenterH: 8,
};

// 布局按钮配置
export const ArrangeConfig = [
    {
        type: ArrangeConst.evenlyH,
        icon: 'design/dist_evenly_h',
        disable: true,
    },
    {
        type: ArrangeConst.evenlyV,
        icon: 'design/dist_evenly_v',
        disable: true,
    },
    {
        type: ArrangeConst.alignLeft,
        icon: 'design/align_left',
        disable: true,
    },
    {
        type: ArrangeConst.alignCenterV,
        icon: 'design/align_center_v',
        disable: true,
    },
    {
        type: ArrangeConst.alignRight,
        icon: 'design/align_right',
        disable: true,
    },
    {
        type: ArrangeConst.alignTop,
        icon: 'design/align_top',
        disable: true,
    },
    {
        type: ArrangeConst.alignCenterH,
        icon: 'design/align_center_h',
        disable: true,
    },
    {
        type: ArrangeConst.alignBottom,
        icon: 'design/align_bottom',
        disable: true,
    },

];
