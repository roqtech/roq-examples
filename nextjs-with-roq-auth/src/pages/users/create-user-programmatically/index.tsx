import AuthLayout from "layout/auth/auth.layout";
import AppLayout from "layout/app/app.layout";
import DemoLayout from "layout/demo/demo.layout";
import { routes } from "routes";
import { useState } from "react";

const CreateUserProgrammatically = () => {
  const [user, setUser] = useState<any>(null);

  const handleCreate = async () => {
    setUser(null);
    const response = await fetch(routes.server.userManagement.createUser, {
      method: "POST",
    });

    setUser((await response.json()).user || null);
  };

  return (
    <AppLayout>
      <DemoLayout requireSession={false}>
        <AuthLayout>
          <button className="btn btn-sm" onClick={handleCreate}>
            Create a random user programmatically
          </button>
          {user ? <pre>{JSON.stringify(user, null, 4)}</pre> : <></>}
        </AuthLayout>
      </DemoLayout>
    </AppLayout>
  );
};

export default CreateUserProgrammatically;
