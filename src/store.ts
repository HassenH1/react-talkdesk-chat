import type { ChatWidgetConfig, ChatWidgetMethodType, ContextParams, EndResult, PropsConfig } from './components/chat/chat.types';
import { CHAT_WIDGET_DEFAULT_CONFIG, CHAT_WIDGET_DEFAULT_PROPS } from './components/chat/constant';

export type ChatWidgetStateConfigs = {
  config?: ChatWidgetConfig;
  propsConfig?: PropsConfig;
  node?: string;
};

// One SDK script per page, so one shared instance. Nothing renders from this state,
// so a plain module variable is enough (no store library needed).
let webchat: ChatWidgetMethodType | undefined;
let configs: ChatWidgetStateConfigs | undefined;

export const getWebchat = () => webchat;
export const setConfigs = (data: ChatWidgetStateConfigs) => { configs = data; };

const withWebchat = (fn: (instance: ChatWidgetMethodType) => void) => {
  if (webchat) {
    fn(webchat);
  } else {
    console.error("Webchat is not initialized");
  }
};

const init = () => {
  if (webchat) {
    console.error("TalkdeskChatSDK already initialized...");
    return;
  }

  if (window.TalkdeskChatSDK) {
    const { config, propsConfig, node = "td-webchat" } = configs || {};
    if (!propsConfig?.touchpointId) {
      console.error("ChatWidget: propsConfig.touchpointId is required");
      return;
    }
    const talkdeskChatSDKProps = { ...CHAT_WIDGET_DEFAULT_PROPS, ...propsConfig };
    const initConfig = {
      ...CHAT_WIDGET_DEFAULT_CONFIG,
      ...config,
      styles: { ...CHAT_WIDGET_DEFAULT_CONFIG.styles, ...config?.styles },
    };
    const instance = window.TalkdeskChatSDK(node, talkdeskChatSDKProps);
    instance.init(initConfig).catch((e) => console.error("TalkdeskChatSDK init failed:", e));
    webchat = instance;
  } else {
    console.error("TalkdeskChatSDK not found on window object");
  }
};

const api = {
  openChat: () => withWebchat((w) => w.open()),
  closeChat: () => withWebchat((w) => w.close()),
  destroyChat: () => withWebchat((w) => { w.destroy(); webchat = undefined; }),
  initChat: init,
  resetChat: () => withWebchat((w) => w.reset()),
  setContextParam: (params: ContextParams) => withWebchat((w) => w.setContextParam(params)),
  popupCloseConversation: () => withWebchat((w) => w.popupCloseConversation()),
  // same "not initialized" result the SDK itself returns, so callers always get a promise
  endChat: (): Promise<EndResult> =>
    webchat ? webchat.end() : Promise.resolve({ success: false, reason: "TalkdeskSDK not initialized" }),
  onOpenChat: (callback?: () => void) => withWebchat((w) => w.onOpenWebchat(callback)),
  onCloseChat: (callback?: () => void) => withWebchat((w) => w.onCloseWebchat(callback)),
  onConversationStart: (callback?: () => void) => withWebchat((w) => w.onConversationStart(callback)),
  onConversationEnded: (callback?: () => void) => withWebchat((w) => w.onConversationEnded(callback)),
  onConversationClear: (callback?: () => void) => withWebchat((w) => w.onConversationClear(callback)),
};

// Same shape as before; the functions are stable, so this is safe to call anywhere.
export const useWebchat = () => api;
