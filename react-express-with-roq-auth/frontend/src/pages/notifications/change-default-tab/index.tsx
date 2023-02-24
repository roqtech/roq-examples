import { NotificationBell } from "@roq/ui-react";

export const NotificationUnreadTab = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* TODO that's not flent! */}
      {/* // @ts-ignore */}
      <NotificationBell
      // type={"inread"}
      />
    </div>
  );
};

export default NotificationUnreadTab;
