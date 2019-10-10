/**
 * Mobile 状态条
 * @author tangzehua
 * @sine 2019-10-10 09:59
 */

// @flow
import React from "react";
import { status_bar_battery, status_bar_signal, status_bar_wifi } from "../../assets/svg";
import "../assets/status-bar.pcss";

type Props = {
    width: number,
    height: number
};

export function StatusBar(props: Props) {
    const { width, height } = props;
    return (
        <div className="group-item" style={{ top: 0, left: 0, width, height, zIndex: 3 }}>
            <div
                className="widget status-bar"
                style={{
                    width,
                    height,
                    left: 0,
                    top: 0,
                    zIndex: 3,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    opacity: 1,
                    transform: "rotate(0deg)"
                }}
            >
                <div className="mobile-status-bar">
                    <div className="time">12:00</div>
                    <div className="signal">{status_bar_signal()}</div>
                    <div className="wifi">{status_bar_wifi()}</div>
                    <div className="battery">{status_bar_battery()}</div>
                </div>
            </div>
        </div>
    );
}
