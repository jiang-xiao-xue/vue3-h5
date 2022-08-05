/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-08-04 15:39:08
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-05 14:40:03
 * @FilePath: \vue3-h5\src\plugins\modal\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { App, createVNode, render } from 'vue';
import Modal from './Modal.vue';
import { IInstance, IModal } from './modal.type';
import config from './config';
interface IConfig {
  style?: {
    opacity?: number;
  };
  props?: {
    close?: boolean;
    maskClose?: boolean;
  };
}
Modal.install = (app: App, options: IConfig = {}) => {
  Object.assign(config.style, options.style || {});
  Object.assign(config.props, options.props || {});

  app.component(Modal.name, Modal);

  app.config.globalProperties.$modal = {
    show({
      title = '',
      content = '',
      close = config.props!.close,
      maskClose = config.props!.maskClose,
      opacity = config.style!.opacity,
      onConfirm,
      onCancel
    }) {
      const container = document.createElement('div');
      const vnode = createVNode(Modal);
      render(vnode, container);
      const instance = vnode.component as IInstance;
      document.body.appendChild(container);

      const { props, _hub } = instance;

      const _closeModal = () => {
        props.modelValue = false;
        container.parentNode!.removeChild(container);
      };

      Object.assign(_hub, {
        t: app.config.globalProperties.$t,
        async 'on-confirm'() {
          if (onConfirm) {
            const fn = onConfirm();
            if (fn && fn.then) {
              try {
                props.loading = true;
                await fn;
                props.loading = false;
                _closeModal();
              } catch (err) {
                // 发生错误时，不关闭弹框
                console.error(err);
                props.loading = false;
              }
            } else {
              _closeModal();
            }
          } else {
            _closeModal();
          }
        },
        'on-cancel'() {
          onCancel && onCancel();
          _closeModal();
        }
      });

      Object.assign(props, {
        isTeleport: false,
        modelValue: true,
        title,
        content,
        close,
        maskClose,
        opacity
      });
    }
  } as IModal;
};
export { IConfig };
export default Modal;