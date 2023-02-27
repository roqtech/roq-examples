import { RoqAuth } from "@roq/nextjs";
import { UserService } from "server/services/user.service";

/*
    You can export RoqAuth without passing any options if you don't need to customize the behaviour
    
    export default RoqAuth; //handles all the authentication routes automatically
*/

export default RoqAuth({
  hooks: {
    onRegisterSuccess: async ({ session, user, state }) => {
      const { email, id: roqUserId } = user;
      const { role } = JSON.parse(Buffer.from(state, "base64").toString());

      console.log("onRegisterSuccess!", JSON.parse(Buffer.from(state, "base64").toString()));

      if (role === "buyer") {
        return UserService.registerAsBuyer(email, roqUserId);
      }

      return UserService.registerAsUser(email, roqUserId);
    },
    // This hook is optional - and can be used to persist user information,
    // or as in the case below, send them a welcome notification
    onLoginSuccess: async ({ session, user, state }): Promise<void> => {
      const { email, id: roqUserId } = user;

      const { sync } = JSON.parse(Buffer.from(state, "base64").toString());

      const shouldSyncWithDb = sync === "t";

      if (shouldSyncWithDb) {
        await UserService.syncUser(email, roqUserId);
      }

      //   If the user was just created, welcome them
      if (Date.now() - new Date(user.createdAt).getTime() < 60000) {
        UserService.welcomeUser(user.id);
      }

      return;
    },
  },
});
