/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-04 13:45
 */
import {action, observable, toJS} from "mobx";
import {ToolbarStore} from "./ToolbarStore";
import {WidgetsStore} from "./WidgetsStore";
import {FooterStore} from "./FooterStore";
import {ScreensStore} from "./ScreensStore";
import {SectionStore} from "./SectionStore";
import {createConfig, ENUM} from "../../../config/Config";
import type {PageConfig, PageData} from "../../../flow/Main.flow";
import {Toast} from 'fr-web'
import {EventEmitter} from 'eventemitter3';
import {DesignEvent} from 'fr-design'
import {AttributeStore} from "./AttributeStore";
import {PropsConst} from "../../../config/Attribute";
import {ViewGroupStore} from "./ViewGroupStore";
import {BaseStore} from "./BaseStore";
import {Storage} from "@xt-web/core";
import {EventsStore} from "./EventsStore";
import {Route} from "@xt-web/react-dom";
import {StructureStore} from "./StructureStore";

export class MainStore {
    // 配置
    @observable
    config: PageConfig;

    _storeList: Array<BaseStore> = [];

    // keyboard
    keyEvents: EventEmitter;
    // store
    screens: ScreensStore;
    toolbar: ToolbarStore;
    widgets: WidgetsStore;
    footer: FooterStore;
    section: SectionStore;
    attribute: AttributeStore;
    viewGroup: ViewGroupStore;
    events: EventsStore;
    structure: StructureStore;

    // 页面ID
    pageId;

    // 页面配置信息
    pageData: PageData = {};

    @observable
    editData = {};

    // 颜色选择器
    @observable colorPickProps = {
        targetRect: null, color: "", onChange: () => {
        }
    };

    constructor(props) {
        let that = this;
        const {name, id} = props.match.params;
        const isApp = name === 'app';
        that.pageId = id;
        that._storeList = [];

        that.keyEvents = new EventEmitter();
        that.screens = new ScreensStore(that);
        that.toolbar = new ToolbarStore(that);
        that.widgets = new WidgetsStore(that);
        that.footer = new FooterStore(that);
        that.section = new SectionStore(that);
        that.attribute = new AttributeStore(that);
        that.viewGroup = new ViewGroupStore(that);
        that.events = new EventsStore(that);
        that.structure = new StructureStore(that);

        that._storeList.forEach(da => da.classMount());
        that.addListener();
        that.config = createConfig({
            isApp: name === 'app',
        });

        that.switchPage = ::that.switchPage;
    }

    /**
     * 初始化
     */
    @action
    init() {
        let that = this;
        const config = that.config;
        const pageData = {
            ...Storage.local.getItem(`${ENUM.PAGE}-${that.pageId}`, config.defaultProps),
            id: that.pageId
        };
        const options = {
            data: pageData,
        };
        that.pageData = pageData;
        that._storeList.forEach(da => {
            da.init(config, options);
        });
    }

    addListener() {
        let that = this;
        DesignEvent.addListener(PropsConst.background, that.onListenerBackgroundColor);
        DesignEvent.addListener(PropsConst.widgetColorHandle, that.handleColorPicker);
    }

    removeListener() {
        let that = this;
        DesignEvent.removeListener(PropsConst.background, that.onListenerBackgroundColor);
        DesignEvent.removeListener(PropsConst.widgetColorHandle, that.handleColorPicker);
    }

    /**
     * 设置背景颜色
     * @param color
     */
    @action
    setBackgroundColor = (color) => {
        DesignEvent.emit(PropsConst.background, color);
    };

    @action
    onListenerBackgroundColor = (color)=> {
        this.editData.backgroundColor = color;
    };

    /**
     * 颜色选择器
     * @param event
     * @param color
     * @param onChange
     */
    @action
    handleColorPicker = (event, color, onChange) => {
        let that = this;
        that.colorPickProps.targetRect = event.target.getBoundingClientRect();
        that.colorPickProps.color = color;
        that.colorPickProps.onChange = onChange;
    };

    pushStore(store: BaseStore) {
        this._storeList.push(store);
    }

    /**
     * 保存数据
     */
    handleSaveData() {
        this.savePageDataToLocal();
        Toast.success("所有修改页面保存完成!");
    }

    /**
     * 保存数据到本地
     */
    savePageDataToLocal() {
        const that = this;
        const data = toJS(that.pageData);
        data.widgets = that.viewGroup.rootWidget.widgetData;
        Storage.local.setItem(`${ENUM.PAGE}-${data.id}`, data);
    }

    /**
     * 切换页面
     * @param {string} pageId
     */
    switchPage(pageId) {
        const that = this;
        const {isApp} = that.config;

        //切换页面时, 保存数据到本地
        that.savePageDataToLocal();
        that.pageId = pageId;
        that.init();

        Route.replace(`/design/${isApp ? "app" : "web"}/${pageId}`);
    }
}
