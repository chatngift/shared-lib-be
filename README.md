### Take fresh changes

```sh
npm cache clean --force
rm -rf node_modules/
rm package-lock.json
npm install
```

## Link with microservice in local

### Method 1: via links

```sh
cd /path/to/my-shared-lib
npm link

cd /path/to/other-microservice
npm link my-shared-lib


import { someFunction } from 'my-shared-lib';
```

### unlink

```sh
npm unlink my-shared-lib
npm unlink

```

### Method 2: via npm install

```sh
cd /path/to/other-microservice
npm install /path/to/my-shared-lib
import { someFunction } from 'my-shared-lib';

npm uninstall my-shared-lib
```
