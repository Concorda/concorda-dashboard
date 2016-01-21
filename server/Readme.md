# Server API

## Authorization


| Method | URL | Description | Documentation |
---------|-----|--------------|--------|
| POST | /auth/change_password | Change password | https://github.com/senecajs/seneca-auth |
| POST | /auth/register | Register user | https://github.com/senecajs/seneca-auth |
| POST | /auth/confirm | Confirm login |  https://github.com/senecajs/seneca-auth |
| GET/POST | /auth/logout | Logout current user | https://github.com/senecajs/seneca-auth |
| POST | /auth/create_reset | Create reset password token | https://github.com/senecajs/seneca-auth |
| POST | /auth/load_reset | Load reset token | https://github.com/senecajs/seneca-auth |
| POST | /auth/execute_reset | Execute reset password | https://github.com/senecajs/seneca-auth |
| GET/POST | /auth/user | Get current user data | https://github.com/senecajs/seneca-auth |
| POST | /auth/update_user | Update current logged in user | https://github.com/senecajs/seneca-auth |
| GET/POST | /auth/login | Login | https://github.com/senecajs/seneca-auth |


## User management

| Method | URL | Description |
---------|-----|--------------|
| POST | /api/user/{user_id}/session/close | Close sessions for selected user |
| GET | /api/user | Get list of users |