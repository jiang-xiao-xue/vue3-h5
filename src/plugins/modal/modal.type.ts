/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-08-04 15:39:46
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-04 17:02:03
 * @FilePath: \vue3-h5\src\plugins\modal\Content.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ComponentInternalInstance, VNode, h } from 'vue';

interface IConfig {
  style?: {
    opacity?: number;
  };
  props?: {
    close?: boolean;
    maskClose?: boolean;
  };
}
type IContent = string | ((h?: any) => VNode | JSX.Element);

interface IModalParams {
  title?: string;
  content: IContent;
  close?: boolean;
  maskClose?: boolean;
  opacity?: number;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
}
interface IModal {
  show(params: IModalParams): void;
}

interface IInstance extends ComponentInternalInstance {
  _hub: {
    t: any;
    'on-cancel': () => void;
    'on-confirm': () => void;
  };
}

export { IConfig, IContent, IModalParams, IModal, IInstance };
