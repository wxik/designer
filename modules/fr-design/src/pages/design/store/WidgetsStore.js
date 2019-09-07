/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:18
 */
import {observable, action, computed} from 'mobx';
import type {MainStore} from "./MainStore.flow";

export class WidgetsStore {

    // 左侧面板是否折叠
    @observable
    isToggle = true;

    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
    }

    @action.bound
    toggle (){
        this.isToggle = ! this.isToggle;
    }
}
