import { defaultGlobalStyleColor } from '@config/globalStyle';
import {
  type GlobalStyleColorName,
  type GlobalStyleColor,
} from '@type/GlobalStyleTypes';
import { type Breakpoints } from '@type/BreakpointTypes';
import { breakpoints } from '@config/breakpoints';
import BaseAtomStore from '@base/BaseAtomStore';
import {
  type EventListenerContextManager,
  buildEventListenerContextManager,
} from '@utils/eventListenerWithContext';
import { globalStyleState } from '@store/index';

class GlobalStyleController extends BaseAtomStore {
  protected static instance: GlobalStyleController | undefined;
  protected globalStyleColor: GlobalStyleColor = defaultGlobalStyleColor;
  protected globalBreakpoints: Breakpoints = breakpoints;
  protected eventListenerContextManager: EventListenerContextManager =
    buildEventListenerContextManager();

  protected constructor() {
    super();
    this.init();
  }

  public static getInstance(): GlobalStyleController {
    if (this.instance === undefined)
      this.instance = new GlobalStyleController();
    return this.instance;
  }

  public static start() {
    GlobalStyleController.getInstance();
  }

  public destroy() {
    GlobalStyleController.instance = undefined;
    this.eventListenerContextManager.clear();
    this.storeClearSubs();
  }

  private updateDesktopSize() {
    this.storeSetAtom(globalStyleState.desktopHeightAtom, window.innerHeight);
    this.storeSetAtom(globalStyleState.desktopWidthAtom, window.innerWidth);
  }

  public setGlobalStyleColor(styleColor: Partial<GlobalStyleColor>) {
    this.globalStyleColor = { ...this.globalStyleColor, ...styleColor };
    this.updateRootColorVariables(this.globalStyleColor);
  }

  private updateRootColorVariables(styleColor: GlobalStyleColor) {
    (Object.keys(styleColor) as GlobalStyleColorName[]).forEach((key) => {
      document.documentElement.style.setProperty(key, styleColor[key]);
    });
  }

  private updateRootFontSize(fontSize: number) {
    document.documentElement.style.setProperty('font-size', `${fontSize}px`);
  }

  private handlerFontSizeToBreakpoints() {
    const bp = this.storeGetAtom(globalStyleState.breakpointAtom);
    switch (bp) {
      case '--bp-narrower':
      case '--bp-narrow':
        this.updateRootFontSize(13);
        break;
      case null:
        this.updateRootFontSize(16);
    }
  }

  private init() {
    this.updateDesktopSize();
    this.updateRootColorVariables(this.globalStyleColor);
    this.handlerFontSizeToBreakpoints();
    this.eventListenerContextManager.set(window, 'resize', () => {
      this.updateDesktopSize();
    });
    this.storeSubToAtom(globalStyleState.breakpointAtom, () => {
      this.handlerFontSizeToBreakpoints();
    });
  }
}

export default GlobalStyleController;
