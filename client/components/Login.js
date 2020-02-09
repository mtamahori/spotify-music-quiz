import React from 'react';
import { Button } from 'semantic-ui-react';

const Login = () => (
  <div className="login">
    <Button size="massive" href="/auth/spotify">
      Log in with Spotify
    </Button>
  </div>
)

export default Login;
