<br />
<div align="center" id="readme-top">
  <h2 align="center">:talkdesk chat widget (unofficial)</h2>
  <p align="center">
    Talkdesk-Chat is the unofficial version of Talkdesk’s live chat tool.
    <br />
    <br />
    <a href="https://docs.talkdesk.com/docs/chat-widget-v2">View official Talkdesk docs</a>
    ·
    <a href="https://github.com/HassenH1/react-talkdesk-chat/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/HassenH1/react-talkdesk-chat/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Talkdesk-Chat is the unofficial wrapper of Talkdesk’s live chat tool that allows businesses to embed a chat interface on their websites or mobile apps, enabling real-time customer support and automated interactions.

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- React 18 or newer
- A Talkdesk chat touchpoint ID

### Installation

```sh
npm install react-talkdesk-chat
```

### Usage

1. Render `ChatWidget` once, anywhere in your app. `touchpointId` is required; everything else is optional.

   ```tsx
   import { ChatWidget } from "react-talkdesk-chat";

   <ChatWidget
     propsConfig={{
       touchpointId: "your-touchpoint-id",
       region: "td-us-1",
     }}
   />
   ```

2. Control the widget from any component with `useWebchat`. No provider is needed.

   ```tsx
   import { useWebchat } from "react-talkdesk-chat";

   const { openChat, closeChat, resetChat, onConversationStart } = useWebchat();

   openChat();
   onConversationStart(() => console.log("conversation started"));
   ```

   Available: `openChat`, `closeChat`, `destroyChat`, `initChat`, `resetChat`, `setContextParam`, `popupCloseConversation`, `endChat`, `onOpenChat`, `onCloseChat`, `onConversationStart`, `onConversationEnded`, `onConversationClear`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Hassen Hassen - [LinkedIn](https://www.linkedin.com/in/hassenhassen/) - hasansaid51@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
