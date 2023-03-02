import AppLayout from "layout/app/app.layout";
import DemoLayout from "layout/demo/demo.layout";

function CustomTheme() {
  return (
    <AppLayout title="UI" description="Custom Theme">
      <DemoLayout>
        <style>
          {`
          :root {
            --roq-color-primary: red !important;
            --roq-border-radius: 2px !important;
          }
        `}
        </style>
      </DemoLayout>
    </AppLayout>
  );
}

export default CustomTheme;
