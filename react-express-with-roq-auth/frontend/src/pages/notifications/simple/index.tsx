import { NotificationBell } from "@roq/ui-react";

export const NotificationSimple = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NotificationBell />
    </div>
  );
};

export default NotificationSimple;
