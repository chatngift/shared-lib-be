# shared-lib-be

Shared common nodejs helper lib used by all microservices

### Step1: build

- Make changes in shared-lib-be a
- run `npm run build `(it will build js file in `dist/` which will be imported by other microservices)

### Step 2: Install in microservice

To install into other microservices. Follow

#### clean `node_module` & `package-lock.json`

```sh
npm cache clean --force
rm -rf node_modules/
rm package-lock.json
npm install
```

#### Intall in Local

This will generate local link to connect with local microservice

```sh
cd /path/to/shared-lib-be
npm link
```

This will import `cng-lib` to other node microservice (`cng-lib` is app name mention in `package.json`)

```
cd /path/to/microservice
npm link cng-lib

import { someFunction } from 'cng-lib';
```

#### Intall in Dev env

```json
{
  "dependencies": {
    "cng-lib": "git+https://github.com/chatngift/shared-lib-be.git#development"
  }
}
```

#### Intall in Prod env

```json
{
  "dependencies": {
    "cng-lib": "git+https://github.com/chatngift/shared-lib-be.git#master"
  }
}
```

### Other method install via npm in local

```sh
cd /path/to/other-microservice
npm install /path/to/shared-lib-be
import { someFunction } from 'cng-lib';

npm uninstall cng-lib
```
