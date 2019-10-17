/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from "react";
import '../assets/mobile/header.pcss'
import type {BaseWidgetProps} from "../base/BaseWidget";
import {BasePanel} from "../base/BasePanel";
import {Form} from "fr-ui";
import {observer} from "mobx-react";
import {LayoutConst, PropsConst} from "../../config/Attribute";

type Props = {
    ...BaseWidgetProps,
};

const backImage = require('fr-art/design/back_chevron.png');

export class Header extends BasePanel<Props> {

    getName(): string {
        return "导航栏";
    }

    // 导航栏高度
    getHeight () {
        return 44;
    }

    getBackground(): string {
        return "#f8f8f8";
    }

    getBasicConfig() {
        const basic = super.getBasicConfig();
        basic.widgetHeight.disabled = false;
        return basic;
    }

    getLayoutConfig(): {} {
        const layout = super.getLayoutConfig();
        return {
            ...layout,
            [PropsConst.layoutAlignItems]: LayoutConst.alignItem.center,
            [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.spaceBetween
        }
    }

    getBoxRect(): { width: number, x: number, y: number, height: number } {
        const rect = super.getBoxRect();
        const {canvasRect, designRect} = this.props;
        rect.width = canvasRect.width;
        rect.height = this.getHeight();
        return rect;
    }

    widgetProps(): [] {
        const that = this;
        const config = super.widgetProps();
        return [
            ...config,
            {
                form: 'title',
                title: '标题',
                type: Form.Const.Type.PanelInput,
            },
            {Type: Form.Const.Type.Line}
        ];
    }

    renderWidget(): * {
        const that = this;
        const data = that.formData ;

        return (
            <>
                <div className={'header-left flex middle'}>
                    <img src={backImage} width={15}/>
                    <span className="text">返回</span>
                </div>
                <div className={'header-title'}>
                    <span className="text">{data.title}</span>
                </div>
                <div className={'header-right'}>
                    <span className="text">菜单</span>
                </div>
            </>
        )
    }
}
