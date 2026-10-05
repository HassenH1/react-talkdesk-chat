import type { ChatWidgetConfig, PropsConfig } from "./chat.types";

export const CHAT_WIDGET_DEFAULT_CONFIG: ChatWidgetConfig = {
  enableEmoji: true,
  enableValidation: false,
  enableUserInput: true,
  enableAttachments: true,
  enableResponsiveLayout: true,
  enablePointMoveTriggerButton: false,
  enableChatHeader: true,
  languageCode: "en-US",
  styles: {
    triggerButtonPositionRight: "10px",
    triggerButtonPositionBottom: "20px",
    // TODO: Add more styles here
  },
  enableSoundNotification: true,
};

// touchpointId has no default: every consumer must pass their own
export const CHAT_WIDGET_DEFAULT_PROPS: Omit<
  PropsConfig,
  "touchpointId" | "region"
> = {
  accountId: "",
  enablePointMoveTriggerButton: false,
  languageCode: "en-US", // Default language code
  autoOpen: false,
  optOutLimit: 86400,
};
