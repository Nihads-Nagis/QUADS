// src/components/docusaurus-plugin-panzoom/PanZoomClientModule.ts
import type { ClientModule } from '@docusaurus/types';
import panzoom, { PanzoomObject } from '@panzoom/panzoom';
import '@site/src/css/panzoom.css';

const selectors = ['div.mermaid[data-processed="true"]', '.drawio']; // your config

const ZoomModule: ClientModule = {
  onRouteDidUpdate() {
    setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>(selectors.join(','));
      elements.forEach((el) => {
        const instance: PanzoomObject = panzoom(el);
        // add toolbar or other handlers if needed
      });
    }, 500);
  },
};

export default ZoomModule;
