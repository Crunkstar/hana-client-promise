# hana-client-promise

Promise and Typescript support to @sap/hana-client module

```
npm i --save @crunkstar/hana-client-promise
```

## Old Readme
## Installation

Add module depency by executing this command inside your project folder:

```
npm install --save-dev @ibsolution/hana-client-promise
```

Or add it from github repository:

```
npm install --save-dev github:ibsolution-de/hana-client-promise
```

And than build module before you can use it.

## Usage

Basic example how to start using @sap/hana-client in Typescript:

```
import { ConnectionOptions, createConnection } from '@ibsolution/hana-client-promise';

const connectionOption: ConnectionOptions = {
    host    : 'myserver',
    port    : '30015',
    uid     : 'system',
    pwd     : 'manager'
};

const SQL = "SELECT CURRENT_USER FROM DUMMY;";

const test = async () => {
    const hana = new HanaClient(connectionOption);
    const client = await hana.createConnection();
    const result = await client.exec(SQL);
    await client.disconnect();
}

test();
```

## Support

If you are interested to get support from us, please feel free to contact us
by using our support contact page

https://www.ibsolution.com/ibsolution-service-request

or repository maintainer with email.

## DISCLAMER

The IBsolution GmbH Materials may include certain third party free or open source components ("FOSS Components"). You may have additional rights in such FOSS Components that are provided by the third party licensors of those components.

The IBsolution GmbH Materials may require certain third party software dependencies ("Dependencies") for the use or operation of such IBsolution GmbH Materials. These dependencies may be identified by IBsolution GmbH in NPM Package json files, product documentation or by other means. IBsolution GmbH does not grant You any rights in or to such Dependencies under this Developer Agreement. You are solely responsible for the acquisition, installation and use of Dependencies. IBsolution GmbH DOES NOT MAKE ANY REPRESENTATIONS OR WARRANTIES IN RESPECT OF DEPENDENCIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY AND OF FITNESS FOR A PARTICULAR PURPOSE. IN PARTICULAR, IBsolution GmbH DOES NOT WARRANT THAT DEPENDENCIES WILL BE AVAILABLE, ERROR FREE, INTEROPERABLE WITH THE IBsolution GmbH MATERIALS, SUITABLE FOR ANY PARTICULAR PURPOSE OR NON-INFRINGING. YOU ASSUME ALL RISKS ASSOCIATED WITH THE USE OF DEPENDENCIES, INCLUDING WITHOUT LIMITATION RISKS RELATING TO QUALITY, AVAILABILITY, PERFORMANCE, DATA LOSS, UTILITY IN A PRODUCTION ENVIRONMENT, AND NON-INFRINGEMENT. IN NO EVENT WILL IBsolution GmbH BE LIABLE DIRECTLY OR INDIRECTLY IN RESPECT OF ANY USE OF DEPENDENCIES BY YOU.
