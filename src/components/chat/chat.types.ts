declare global {
  interface Window {
    /**
     * TalkdeskChatSDK is a global object that represents the Talkdesk Chat SDK.
     * It is dynamically loaded and initialized in the ChatWidget component.
     */
    TalkdeskChatSDK?: (
      node: string,
      props?: PropsConfig,
    ) => ChatWidgetMethodType;
  }
}

/**
 * Flat key-value context sent with setContextParam. Nested objects are not supported by the SDK.
 */
export type ContextParams = Record<string, string | number | boolean>;

/**
 * Result of end(). `reason` explains why it failed, e.g. 'TalkdeskSDK not initialized'.
 */
export type EndResult = { success: boolean; reason: string };

/**
 * ChatWidgetMethodType defines the methods available on the Talkdesk Chat SDK instance.
 * It includes methods for controlling the chat widget, such as opening, closing, and resetting the chat.
 */
export type ChatWidgetMethodType = {
  /**
   * The close method is used for minimizing the chat widget by hitting the minimize icon in the chat box header.
   */
  close: () => void;
  /**
   * The destroy method is used when you need to remove or delete the running chat widget. It will be completely deleted from your website. If you need to display it again, you need to call the init method. If there is an ongoing conversation, it will be disconnected
   */
  destroy: () => void;
  /**
   * The init event is used for doing something after the chat widget is initialized. It’s an asynchronous function and receives the customized configuration of the chat widget as arguments.
   */
  init: (config: ChatWidgetConfig) => Promise<void>;
  /**
   * The open method used for maximizing the chat widget by hitting the following icon.
   */
  open: () => void;
  /**
   * The popupCloseConversation method is used to trigger the closing of the conversation pop-up window.
   */
  popupCloseConversation: () => void;
  /**
   * The reset method can reset the entire chat widget back to its original state and clear the local cache. If there is an ongoing conversation, it will also be disconnected.
   */
  reset: () => void;
  /**
   * The end method programmatically terminates the active conversation, like the user closing the chat but without the confirmation prompt.
   * Don't call it during page unload: the browser may close the page before the request finishes.
   */
  end: () => Promise<EndResult>;
  /**
   * The setContextParam method is used for transmitting customized key-value context to TD internal systems such as Studio Flow, for example. We can transmit the customer’s using language or address to the agent. The customized context will be displayed in the Context tab of Conversation through Studio.
   * Only flat key-value pairs are supported, not nested objects.
   */
  setContextParam: (params: ContextParams) => void;
  /**
   * The onOpenWebchatevent is used to do something after the chat widget is opened. It receives a callback as its argument to execute your customized logic.
   */
  onOpenWebchat: (callback?: () => void) => void;
  /**
   * The onCloseWebchatevent is used to do something after the chat widget is closed. It receives a callback as its argument to execute your customized logic.
   */
  onCloseWebchat: (callback?: () => void) => void;
  /**
   * The onConversationStartevent' is used to do something after the chat conversation starts. It receives a callback as its argument to execute your customized logic.
   */
  onConversationStart: (callback?: () => void) => void;
  /**
   * The onConversationEnded event is triggered when the conversation ends, such as when the contact person, agent, or virtual agent closes the conversation. It accepts a callback function to execute your custom logic.
   */
  onConversationEnded: (callback?: () => void) => void;
  /**
   * The onConversationClear event is triggered when the contact person clicks the Start New Chat button to clear the current conversation. It accepts a callback function where you can define your business logic.
   */
  onConversationClear: (callback?: () => void) => void;
};

/**
 * Region defines the supported regions for the chat widget.
 * It includes regions such as US, EU, CA, AP, and US Federal.
 */
export type Region =
  | "td-us-1"
  | "td-eu-1"
  | "td-ca-1"
  | "td-ap-1"
  | "td-usfed-1";

/**
 * LanguageCode defines the supported language codes for the chat widget.
 * It includes languages such as English (US), Portuguese (PT and BR), Spanish, French, German, Italian, and Arabic.
 */
export type LanguageCode =
  | "en-US"
  | "pt-PT"
  | "pt-BR"
  | "es-ES"
  | "fr-FR"
  | "de-DE"
  | "it-IT"
  | "ar-SA"
  | "ar-EG";

export type Styles = {
  /**
   * The color for the chat launcher
   */
  chatLauncherColor?: string;
  /**
   * The color for the chat hover launcher
   */
  chatHoverLauncherColor?: string;
  /**
   * Width of launcher icon. _Note: up to 64 px
   */
  triggerButtonWidth?: string;
  /**
   * Height of launcher icon. _Note: up to 64 px
   */
  triggerButtonHeight?: string;
  /**
   * Distance of launcher icon to the right side of the window
   */
  triggerButtonPositionRight?: string;
  /**
   * Distance of launcher icon to the bottom side of the window
   */
  triggerButtonPositionBottom?: string;
  /**
   * Custom audio URL for sound notification.
   */
  receiveMessageAudioURL?: string;
};

export type ChatWidgetConfig = {
  /**
   * Enable/disable the emoji capability
   * @default true
   */
  enableEmoji?: boolean;
  /**
   * Enable/disable the validation of the email or phone number in the Initial screen
   * @default false
   */
  enableValidation?: boolean;
  /**
   * Enable/disable the sending box
   * @default true
   */
  enableUserInput?: boolean;
  /**
   * Enable/disable sending/receiving attachment capability
   * @default true
   */
  enableAttachments?: boolean;
  /**
   * Enable/disable auto full-screen capability
   * @default true
   */
  enableResponsiveLayout?: boolean;
  /**
   * Enable/disable drag and move for the chat launcher
   * @default false
   */
  enablePointMoveTriggerButton?: boolean;
  /**
   * Show/hidden chat widget header ui
   * @default true
   */
  enableChatHeader?: boolean;
  /**
   * Using language: en-US pt-PT pt-BR es-ES de-DE fr-FR it-IT ar-SA ar-EG
   * @default 'en-US'
   */
  languageCode?: LanguageCode;
  /**
   * Custom styles for the chat widget
   */
  styles?: Styles;
  /**
   * Enable/disable the sound notification
   * @default true
   */
  enableSoundNotification?: boolean;
};

export type PropsConfig = {
  /**
   * Use to get the chat-widget touchpoint configuration
   */
  touchpointId: string;
  /**
   * @Deprecated
   * Note: Keep this field only for compatibility, please better use touchpointId instead.
   */
  flowId?: string;
  /**
   * @Deprecated
   * Note: Keep this field only for compatibility, it won’t work if configured.
   */
  accountId?: string;
  /**
   * The region of the TD endpoints gateway: td-us-1, td-eu-1, td-ca-1, td-ap-1, td-usfed-1
   */
  region: Region;
  /**
   * Enable/disable drag and move for the chat launcher
   * @default false
   */
  enablePointMoveTriggerButton?: boolean;
  /**
   * Using language: en-US pt-PT pt-BR es-ES de-DE fr-FR it-IT ar-SA ar-EG
   * @default 'en-US'
   */
  languageCode?: LanguageCode;
  /**
   * Automatically open widget after initialization
   * @default false
   */
  autoOpen?: boolean;
};

/**
 * ChatWidgetProps defines the properties for the ChatWidget component.
 * It includes an optional configuration object for the chat widget and a required props configuration object (touchpointId).
 */
export type ChatWidgetProps = {
  config?: ChatWidgetConfig;
  propsConfig: PropsConfig;
  node?: string;
};
