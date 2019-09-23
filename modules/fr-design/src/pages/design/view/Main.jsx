/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-08-28 16:49
 */
import React, { Component } from "react";
import "../assets/design.pcss";
import { Toolbar } from "./Toolbar";
import { Screens } from "./Screens";
import { Footer } from "./Footer";
import { Widgets } from "./Widgets";
import { RightPanel } from "./RightPanel";
import { LeftPanel } from "./LeftPanel";
import { Section } from "./Section";
import { observer } from "mobx-react";
import { MainStore } from "../store/MainStore";
import { ColorPicker, PopupPanel } from "fr-ui";

@observer
export class Main extends Component {
    constructor(props) {
        super(props);
        let that = this;
        that.store = new MainStore(props);
    }

    componentDidMount() {
        document.addEventListener("contextmenu", this.handleContextMenu);
    }

    componentWillUnmount() {
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    handleContextMenu = event => {
        event.preventDefault();
    };

    renderContext() {
        let store = this.store;
        return (
            <div className={"ds-content"}>
                <Screens store={store.screens} />
                <Widgets store={store.widgets} />
                <LeftPanel store={store.widgets} />
                <main className={"ds-viewport"}>
                    <Section store={store.section} />
                    <Footer store={store.footer} />
                </main>
                <RightPanel store={store.widgets} />
            </div>
        );
    }

    renderSlidePanel() {
        let store = this.store;
        const { slideActiveType, handleSlidePanelClose } = store.widgets;
        const topHeight = 112;
        return (
            <>
                <PopupPanel
                    title={"组件"}
                    visible={slideActiveType === "widget"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                />
                <PopupPanel
                    title={"我的组件"}
                    visible={slideActiveType === "my_widget"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                />
                <PopupPanel
                    title={"图标"}
                    visible={slideActiveType === "icons"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                />
                <PopupPanel
                    title={"母版"}
                    visible={slideActiveType === "master"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                />
            </>
        );
    }

    _render() {
        let store = this.store;
        const { color, targetRect, onChange: colorChange } = store.colorPickProps;
        return (
            <div id={"design"}>
                <div className={"ds-design"}>
                    <Toolbar store={store.toolbar} />
                    {this.renderContext()}
                    <div className={"fixed_area"}>
                        {this.renderSlidePanel()}
                        <ColorPicker color={color} onChange={colorChange} targetRect={targetRect} />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
