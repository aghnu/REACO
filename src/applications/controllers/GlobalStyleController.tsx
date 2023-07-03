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
import { gsap } from 'gsap';

type ThemeSwitchMode = 'init' | 'transition';

class GlobalStyleController extends BaseAtomStore {
  protected static instance: GlobalStyleController | undefined;
  protected gsapContext: gsap.Context | undefined;
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
      this.instance.handlerThemeMode('init');
      this.instance.updateDesktopSize();
      this.instance.handlerFontSizeToBreakpoints();
    }

    return this.instance;
  }

  private cleanGsapAnimation() {
    if (this.gsapContext !== undefined) {
      this.gsapContext.kill();
      this.gsapContext = undefined;
    }
  }

  public static destroy() {
    if (this.instance === undefined) return;
    this.instance.eventListenerContextManager.clear();
    this.instance.storeClearSubs();
    this.instance.cleanGsapAnimation();
    this.instance = undefined;
  }

  private updateDesktopSize() {
    this.storeSetAtom(globalStyleState.desktopHeightAtom, window.innerHeight);
    this.storeSetAtom(globalStyleState.desktopWidthAtom, window.innerWidth);
  }

  private updateRootColorVariables(
    styleColor: GlobalStyleColor,
    animationMode: ThemeSwitchMode
  ) {
    this.cleanGsapAnimation();
    this.gsapContext = gsap.context(() => {
      (Object.keys(styleColor) as GlobalStyleColorName[]).forEach((key) => {
        gsap.to(':root', {
          [key]: styleColor[key],
          duration: animationMode === 'init' ? 0 : 0.65,
          overwrite: 'auto',
          ease: 'expo.out',
        });
      });
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
      case '--bp-wide':
      case '--bp-infinity':
      case '--bp-init':
        this.updateRootFontSize(16);
    }
  }

  private handlerThemeMode(animationMode: ThemeSwitchMode = 'transition') {
    const mode = this.storeGetAtom(globalStyleState.displayThemeMode);
    if (mode === 'dark') {
      this.updateRootColorVariables(this.globalStyleColorDark, animationMode);
    } else {
      this.updateRootColorVariables(this.globalStyleColorLight, animationMode);
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
