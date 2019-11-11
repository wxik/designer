/**
 *
 * @author tangzehua
 * @sine 2019-08-29 21:15
 */

// @flow
import React from "react";
import ReactDOM from 'react-dom';
import "../assets/widgets.pcss";
import {IBotIcon, IBotSVG} from "fr-web";
import {observer} from "mobx-react";
import {WidgetsStore} from "../store/WidgetsStore";

type Props = { store: WidgetsStore };
type State = {};

@observer
export class Widgets extends React.Component<Props, State> {

    componentDidMount() {
        this.props.store.mount();
    }

    componentWillUnmount() {
        this.props.store.unmount();
    }

    renderNewWidget() {
        const that = this;
        const {main, newWidget, newWidgetRect} = that.props.store;
        const {designRect} = main.config;
        const style = {
            width: newWidgetRect.width,
            height: newWidgetRect.height,
            left: newWidgetRect.x,
            top: newWidgetRect.y
        };
        return (
            ReactDOM.createPortal((
                <div style={style} className={`group-list ${designRect.type} drag-new-widget`}>
                    {newWidget}
                </div>
            ), document.body)
        )
    }

    render() {
        let store = this.props.store;
        return (
            <div className={"ds-widgets-bar"}>
                <ul className={"basic"} id={"basic-widgets"}>
                    <li>
                        <IBotIcon name={"design"} type={"icon"}/>
                    </li>
                    <li>
                        <IBotIcon name={"apple"} type={"icon"}/>
                    </li>
                    <li>
                        <IBotIcon name={"windows"} type={"icon"}/>
                    </li>
                </ul>
                <div className={'nav-footer'}>
                    <div className={'toggle-icon'}>
                        <IBotSVG name={'recycle'}/>
                    </div>
                    <div className="divider-line"/>
                    <div className={"toggle-icon"} onClick={store.handleLeftPanelToggle}>
                        <IBotIcon name={"left_double_bracket"} type={"dora"}
                                  className={`toggle-btn ${store.isLeftPanelOpen ? 'is-toggle' : ''}`}/>
                    </div>
                </div>
                {this.renderNewWidget()}
            </div>
        );
    };
}
