import {
  defaultGlobalStyleColorDark,
  defaultGlobalStyleColorLight,
} from '@config/globalStyle';
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
  protected globalStyleColorDark: GlobalStyleColor =
    defaultGlobalStyleColorDark;

  protected globalStyleColorLight: GlobalStyleColor =
    defaultGlobalStyleColorLight;

  protected globalBreakpoints: Breakpoints = breakpoints;
  protected eventListenerContextManager: EventListenerContextManager =
    buildEventListenerContextManager();

  protected constructor() {
    super();
    this.init();
  }

  public static getInstance(): GlobalStyleController {
    if (this.instance === undefined) {
      this.instance = new GlobalStyleController();
      this.instance.handlerThemeMode();
      this.instance.updateDesktopSize();
      this.instance.handlerFontSizeToBreakpoints();
    }

    return this.instance;
  }

  public static destroy() {
    if (this.instance === undefined) return;
    this.instance.eventListenerContextManager.clear();
    this.instance.storeClearSubs();
    this.instance = undefined;
  }

  private updateDesktopSize() {
    this.storeSetAtom(globalStyleState.desktopHeightAtom, window.innerHeight);
    this.storeSetAtom(globalStyleState.desktopWidthAtom, window.innerWidth);
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

  private handlerThemeMode() {
    const mode = this.storeGetAtom(globalStyleState.displayThemeMode);
    if (mode === 'dark') {
      this.updateRootColorVariables(this.globalStyleColorDark);
    } else {
      this.updateRootColorVariables(this.globalStyleColorLight);
    }
  }

  private init() {
    // desktop theme mode handling
    this.storeSubToAtom(globalStyleState.displayThemeMode, () => {
      this.handlerThemeMode();
    });

    // desktop size handling
    this.eventListenerContextManager.set(window, 'resize', () => {
      this.updateDesktopSize();
    });

    // font size handling
    this.storeSubToAtom(globalStyleState.breakpointAtom, () => {
      this.handlerFontSizeToBreakpoints();
    });
  }
}

export default GlobalStyleController;
