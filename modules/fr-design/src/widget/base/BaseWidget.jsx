/**
 *
 * @author tangzehua
 * @sine 2019-10-11 11:02
 */

// @flow
import React from "react";
import {classNames, DesignEvent} from "fr-web";
import {PropsConst, StatesConst} from "../../config/Attribute";
import {Form} from "fr-ui";
import type {DesignType, Rect, WidgetConfigDefined, WidgetProps, WidgetState} from "../../flow/Main.flow";
import {WidgetConfig} from "./base.widget.config";
import {Types} from "@xt-web/core";

export type BaseWidgetProps = {
    canvasRect: Rect,
    designRect: DesignType,
    module: Object, // 所有可用属性控件
    parent?: { current: any },
    isDrag: boolean, // 是否被拖动
    ...WidgetConfigDefined
};
type State = {
    widget: Object,
    children: string[] | string
};

export class BaseWidget extends React.Component<BaseWidgetProps, State> {
    widgetRef = React.createRef();

    // 状态标识
    _stateId: string;

    // 状态数据
    stateData = {
        default: {
            props: {},
            event: []
        }
    };
    states: [WidgetState] = [];
    fields = {};

    get widget() {
        return this.widgetRef.current;
    }

    // 父节点
    get parentWidget(): BaseWidget | null {
        return this.props.parent;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.widget !== prevState.pWidget || nextProps.children !== prevState.pChildren) {
            const {widget, children} = nextProps;
            return {
                widget,
                pWidget: widget,
                children,
                pChildren: children
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        let that = this;
        that.state = {
            dragWidgetId: null,
            widget: props.widget,
            children: props.children
        };
        that.states = props.states || [];
        // 所有子节点引用
        that.childrenMap = new Map();
        // 更新回调
        that.onUpdate = null;
        that._styles = null;
        // 初始化为默认状态属性
        that.initWidgetState();
    }

    initWidgetState() {
        const that = this;
        const {states = [], props = {}, event = []} = that.props;

        for (const {cid} of [...states, StatesConst.default]) {
            const data = that.createWidgetProps(props[cid] || {});
            const evt = event[cid] || [];
            that.stateData[cid] = {props: data, event: evt};
        }
        that.fields = that.widgetProps();
    }

    /**
     * 返回原始状态
     * @returns {string}
     */
    getStateId() {
        return this._stateId;
    }

    /**
     * 处理后的状态
     * @returns {string}
     */
    get stateId() {
        const id = this._stateId;
        return !id || id === StatesConst.global.cid ? StatesConst.default.cid : id;
    }

    /**
     * 获取所有的配置数据
     * @returns {T|*[]}
     */
    get widgetData() {
        const that = this;
        const {component, draggable} = that.props;
        const {children, widget} = that.state;
        const cid = that.getId(),
            name = that.getName(),
            states = that.getWidgetStates(),
            event = {},
            props = {};
        for (const [name, value] of Object.entries(that.stateData)) {
            props[name] = value.props;
            event[name] = value.event;
        }
        const data = Object.assign(Object.create(null), {
            cid,
            name,
            component,
            event,
            props,
            draggable,
            children,
            widget,
            states
        });
        // 当前widget数据放第一个
        return Array.from(that.childrenMap.values()).reduce((acc, cur) => (cur && acc.push(...cur.widgetData), acc), [
            data
        ]);
    }

    /**
     * 创建子widget
     * @param {Array<string>|string} widgetIds
     * @param {Map<string, WidgetConfigDefined>} [widgetMap]
     * @returns {*}
     */
    createWidget(widgetIds, widgetMap) {
        const that = this;
        const {canvasRect, designRect, module} = that.props;
        if (!module) return null;
        const {dragWidgetId} = that.state;
        widgetMap = widgetMap || that.props.widgetMap;
        const names = Array.isArray(widgetIds) ? widgetIds : [widgetIds];

        return names.map(cid => {
            const widget = widgetMap.get(cid);
            if (!widget) return null;
            const Comp = module[widget.component];
            return (
                Comp && (
                    <Comp
                        key={cid}
                        {...widget}
                        canvasRect={canvasRect}
                        designRect={designRect}
                        widgetMap={widgetMap}
                        module={module}
                        parent={that}
                        ref={ref => that.childrenMap.set(cid, ref)}
                        isDrag={dragWidgetId === cid}
                    />
                )
            );
        });
    }

    //子类实现
    getDefaultName() {
        return "widget";
    }

    /**
     * 是否可拖动
     * @returns {*}
     */
    isDraggable() {
        const {draggable} = this.props;
        return Types.isEmpty(draggable) ? true : draggable;
    }

    /**
     * 是否可删除, 目前不可拖动就不可删除
     * @returns {boolean}
     */
    isDelete() {
        return this.isDraggable();
    }

    // 获取组件ID
    getId() {
        return this.props.cid;
    }

    getName() {
        const data = this.getFormData();
        return data[PropsConst.widgetName] || this.getDefaultName();
    }

    componentDidMount() {
        const that = this;
        const {widgetMap} = that.props;
        widgetMap && that.addListener();
    }

    componentWillUnmount() {
        const that = this;
        const {widgetMap} = that.props;
        widgetMap && that.removeListener();
    }

    componentDidUpdate(prevProps, prevState) {
        let that = this;
        that.onUpdate && that.onUpdate();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const that = this;
        return (
            nextState.widget !== that.state.widget ||
            nextState.children !== that.state.children ||
            nextProps.isDrag !== that.props.isDrag ||
            nextProps.module !== that.props.module ||
            nextState.dragWidgetId !== that.state.dragWidgetId
        );
    }

    // 子类实现, 默认值
    getDefaultConfig() {
        const that = this;
        const name = that.props.name;
        return {
            [PropsConst.widgetName]: name || that.getName(),
            [PropsConst.widgetInitialWidth]: false,
            [PropsConst.widgetInitialHeight]: false
        };
    }

    // 子类可继承
    createWidgetProps(config) {
        return Object.assign({}, this.getDefaultConfig(), config);
    }

    addListener() {
        let that = this;

        if (that.widget) {
            that.widget.addEventListener("mouseleave", that.handleMouseLeave, false);
            that.widget.addEventListener("mousedown", that.handleMouseDown, false);
            that.widget.addEventListener("mouseover", that.handleMouseEnter, false);
        }
    }

    removeListener() {
        let that = this;

        if (that.widget) {
            that.widget.removeEventListener("mouseleave", that.handleMouseLeave);
            that.widget.removeEventListener("mousedown", that.handleMouseDown);
            that.widget.removeEventListener("mouseover", that.handleMouseEnter);
        }
    }

    /**
     * 同步不同状态的widget名称
     * @param value
     */
    asyncName = value => {
        Object.values(this.stateData).forEach(({props}) => (props[PropsConst.widgetName] = value));
    };

    /**
     * 获得鼠标焦点
     * @param {MouseEvent} event
     */
    handleMouseEnter = (event: MouseEvent): void => {
        if (event.ctrlKey || event.metaKey) return;
        DesignEvent.emit(PropsConst.widgetMouseEnter, event, this);
    };

    /**
     * 失去鼠标焦点
     * @param {MouseEvent} event
     */
    handleMouseLeave = (event: MouseEvent): void => {
        DesignEvent.emit(PropsConst.widgetMouseExit, event, this);
    };

    /**
     * 元素被点击
     * @param {MouseEvent} event
     */
    handleMouseDown = (event: MouseEvent): void => {
        if (event.ctrlKey || event.metaKey) return;
        DesignEvent.emit(PropsConst.widgetMouseDown, event, this);
    };

    /**
     * 表单数据改变
     */
    handleChange() {
        this.refreshWidget();
    }

    refreshWidget() {
        this.forceUpdate();
    }

    /**
     * 是否禁用宽度改变
     * @returns {boolean}
     */
    getBasicConfig() {
        return {
            widgetX: {min: 0, disabled: true},
            widgetY: {min: 0, disabled: true},
            widgetWidth: {min: 0, disabled: true},
            widgetHeight: {min: 0, disabled: true}
        };
    }

    updateBasicData() {
        const that = this;
        const data = that.getFormData();
        data[PropsConst.widgetX] = that.widget.offsetLeft;
        data[PropsConst.widgetY] = that.widget.offsetTop;

        if (!data[PropsConst.widgetInitialWidth]) {
            data[PropsConst.widgetWidth] = that.widget.offsetWidth;
        }

        if (!data[PropsConst.widgetInitialHeight]) {
            data[PropsConst.widgetHeight] = that.widget.offsetHeight;
        }
    }

    /**
     * widget 属性, 子类实现
     * @param {Array<WidgetProps>} [child]
     * @returns Array<WidgetProps>
     */
    widgetProps(child: Array<WidgetProps> = []) {
        const that = this;
        const basic = that.getBasicConfig();
        const nameOptions = {onChange: that.asyncName};
        return WidgetConfig({basic, nameOptions});
    }

    /**
     * 获取widget属性
     * @returns {Array<WidgetProps>}
     */
    getWidgetProps(): [WidgetProps] {
        const that = this;
        this.updateBasicData();
        // return that.stateData[that.stateId].props;
        return that.fields;
    }

    /**
     * 获取widget states
     * @returns {[WidgetState]}
     */
    getWidgetStates(): [WidgetState] {
        return this.states;
    }

    /**
     * 切换状态
     * @param stateId
     */
    switchStates(stateId: string) {
        let that = this;
        if (that._stateId === stateId) return;
        if (stateId in that.stateData || stateId === StatesConst.global.cid) {
            that._stateId = stateId;
            that.refreshWidget();
            // console.log('状态切换:', stateId);
        } else {
            console.error("状态属性未找到:", stateId);
        }
    }

    /**
     * 添加状态, 复制当前状态数据
     * @param {WidgetState} state
     */
    addState(state: WidgetState) {
        const that = this;
        that.stateData[state.cid] = JSON.parse(JSON.stringify(that.stateData[that.stateId]));
        that.states.push(state);
    }

    /**
     * 删除状态其属性
     * @param stateId
     */
    removeState(stateId) {
        delete this.stateData[stateId];
    }

    /**
     * 子类可重写, 默认Add widget 到children 里面
     * @param {string} widgetId
     * @returns {*|boolean}
     */
    addNewWidget(widgetId: string) {
        const that = this;
        const {children = []} = that.state;
        that.setState({children: [...children, widgetId], dragWidgetId: widgetId});
    }

    /**
     * 粘贴新的widget
     * @param widgetId
     * @param targetId
     */
    pastWidget(widgetId: string, targetId: string) {

    }

    /**
     * 获取所有子节点
     * @returns {*|*[]}
     */
    get widgetIds() {
        return this.state.children || [];
    }

    /**
     * 重新设置子节点
     * @param widgets
     */
    set widgetIds(widgets) {
        this.setState({children: widgets});
    }

    /**
     * 获取拖拽widget id
     * @returns {null}
     */
    getDragWidgetId() {
        return this.state.dragWidgetId;
    }

    /**
     * 设置拖拽widget id
     * @param widgetId
     */
    setDragWidgetId(widgetId) {
        this.setState({dragWidgetId: widgetId});
    }

    /**
     * 删除widget
     * @param widgetId
     * @return {*|boolean}
     */
    removeWidget(widgetId: string) {
        const that = this;
        const {children = []} = that.state;
        const widget = that.childrenMap.get(widgetId);

        // 不支持 退拽也不支持删除
        if (!widget || !widget.isDelete()) {
            return false;
        }

        const wix = children.indexOf(widgetId);
        if (wix !== -1) {
            children.splice(wix, 1);
            that.setState({children: Array.from(children), dragWidgetId: null});
        }
    }

    /**
     * 删除自己
     * @return {*|boolean}
     */
    removeSelf() {
        return this.isDelete() && this.parentWidget.removeWidget(this.getId());
    }

    /**
     * 原始表单数据
     * @returns {Object}
     */
    getFormData() {
        const that = this;
        return that.stateData[that.stateId].props;
    }

    // 获取style 对象
    get styles() {
        const that = this;
        if (!that._styles) {
            that._styles = Form.View.getFormatFormData(this.getFormData());
            setTimeout(function () {
                that._styles = null;
            }, 0);
        }
        return that._styles;
    }

    // 子类实现
    renderWidget(widgets) {
        const that = this;
        if (!Array.isArray(widgets) || !widgets) return widgets;
        return that.createWidget(widgets);
    }

    renderChild(options) {
        return this.renderWidget(this.state.children);
    }

    render() {
        let that = this;
        const {cid, isDrag} = that.props;
        return (
            <div className={classNames("group-flow", {"drag-widget": isDrag})} ref={that.widgetRef} data-cid={cid}>
                {that.renderChild()}
            </div>
        );
    }
}
