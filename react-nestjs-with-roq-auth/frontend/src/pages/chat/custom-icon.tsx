import { ChatMessageBell } from "@roq/ui-react";

const ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={20}
    height={20}
  >
    <path d="M24 4C12.972 4 4 12.972 4 24c0 3.186.77 6.343 2.232 9.172l-2.139 7.657a2.503 2.503 0 0 0 .64 2.439 2.504 2.504 0 0 0 2.441.64l7.661-2.139A20.005 20.005 0 0 0 24 44c11.028 0 20-8.972 20-20S35.028 4 24 4z" />
  </svg>
);

function ChatCustomMessageBellPage() {
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ChatMessageBell icon={ICON} />
    </div>
  );
}

export default ChatCustomMessageBellPage;
