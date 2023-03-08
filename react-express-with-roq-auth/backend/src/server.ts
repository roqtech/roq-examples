import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import AuthRoute from '@routes/auth.route';
import FilesRoute from '@routes/files.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new FilesRoute()]);

app.listen();
