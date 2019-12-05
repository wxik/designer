/**
 *
 * @author tangzehua
 * @sine 2019-08-23 11:15
 */

import React from 'react';
import './assets/index.css';
import 'react-hot-loader';
import WidgetModule, {RootWidget} from './widget'
import * as Config from './config'
import {register} from './router';

register();
const version = process.env.MODULE_VERSION;
export {
    version,
    RootWidget,
    WidgetModule,
    Config
}
