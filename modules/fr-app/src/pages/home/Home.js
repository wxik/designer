/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React, {PureComponent} from "react";
import {Color} from './ColorPicker'
import {Resizeble} from './Resizeble'
import {Rules} from './Rules'
import {Route} from "@xt-web/react-dom";

export class Home extends PureComponent {

    gotoHome = ()=> {
        Route.push("/");
    };

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.gotoHome}>
                        HOME22
                    </button>
                </div>
                <span>sb app</span>
                <Color/>
                <div>
                    <Resizeble/>
                </div>
                <div>
                    <Rules/>
                </div>
            </div>
        )
    }
}