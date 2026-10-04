import { useEffect } from "react";
import { getWebchat, setConfigs, useWebchat } from "../../store";
import type { ChatWidgetProps } from "./chat.types";

const SDK_URL = "https://talkdeskchatsdk.talkdeskapp.com/v2/talkdeskchatsdk.js";
let sdkPromise: Promise<void> | undefined;

// Adds the SDK <script> once per page; every mount (StrictMode, remounts) shares the same load.
function loadSdk() {
  sdkPromise ??= new Promise<void>((resolve, reject) => {
    if (window.TalkdeskChatSDK) return resolve();
    const script = document.createElement("script");
    script.async = true;
    script.src = SDK_URL;
    script.id = "tdwebchatscript";
    script.onload = () => resolve();
    script.onerror = (error) => {
      script.remove();
      sdkPromise = undefined; // allow a retry on next mount
      reject(error);
    };
    document.body.appendChild(script);
  });
  return sdkPromise;
}

/**
 * ChatWidget is a React functional component that dynamically loads the Talkdesk Chat SDK
 * and initializes a web chat widget within the application.
 *
 * @param config - Optional configuration object for initializing the chat widget.
 * @param propsConfig - Required (needs touchpointId). Properties for customizing the chat widget's behavior and appearance.
 * @returns A React element containing the chat widget container.
 *
 * @remarks
 * - If the TalkdeskChatSDK is already present on the window object, the component logs an error and does not re-initialize.
 * - The SDK script is loaded asynchronously and initialized once loaded.
 * - Errors during script loading are logged to the console.
 *
 * @example
 * ```tsx
 * <ChatWidget config={myConfig} propsConfig={myPropsConfig} />
 * ```
 */
function ChatWidget(props: ChatWidgetProps) {
  const { config, propsConfig, node = "td-webchat" } = props;
  const { initChat: initialize, destroyChat } = useWebchat();

  useEffect(() => {
    let cancelled = false;
    let created: ReturnType<typeof getWebchat>;

    loadSdk()
      .then(() => {
        // unmounted while loading (e.g. StrictMode's first mount), or another ChatWidget already owns the instance
        if (cancelled || getWebchat()) return;
        setConfigs({ config, node, propsConfig });
        initialize();
        created = getWebchat();
      })
      .catch((error) => console.error("Error loading TalkdeskChatSDK:", error));

    return () => {
      cancelled = true;
      // only destroy the instance this component created
      if (created && getWebchat() === created) destroyChat();
    };
    // Props are read once on mount. To apply new config, remount with a different `key`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id={node} />;
}

export default ChatWidget;
