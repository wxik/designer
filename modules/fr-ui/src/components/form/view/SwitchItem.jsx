/**
 *
 * @author tangzehua
 * @sine 2019-10-21 13:38
 */

// @flow
import React from 'react';
import {BaseItem} from '../base/BaseItem'
import {IBotForm} from 'fr-web'

type Props = {};
type State = {};

export class SwitchItem extends BaseItem<Props, State> {

    renderItem() {
        const that = this;
        const {value = false, disabled} = that.state;

        return (
            <IBotForm.Check isChecked={value} onChange={that.onChange} disabled={disabled}/>
        );
    };
}
