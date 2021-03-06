/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React, { PureComponent } from "react";
import { Color } from "./ColorPicker";
import { Resizeble } from "./Resizeble";
import { Rules } from "./Rules";
import { Route } from "@xt-web/react-dom";
import "./../assets/home.pcss";

export class Home extends PureComponent {

    gotoHome = () => {
        Route.push("/");
    };

    render() {
        return (
            <div className={'fr-test'}>
                <button onClick={this.gotoHome}> HOME</button>
                <span>sb app</span>
                <div>
                    <Color/>
                    <Rules/>
                    <Resizeble/>
                </div>

            </div>
        );
    }
}
