# pltziverse-db

##Usage

```js
const setupDatabbase = require('platziverse-db')

setupDatabbase(config).then(db => {
    const { Agent, Metric } = db
}).catch(err => console.error(err))
```