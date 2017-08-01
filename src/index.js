import dva from 'dva'
import { browserHistory } from 'dva/router'

import './index.html'
import './index.css'

// 1. Initialize
const app = dva({
  history: browserHistory,
})

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login/login'));
app.model(require('./models/comment/comment'));
app.model(require('./models/classification/classification'));
app.model(require('./models/classification/classification_manage'));
app.model(require('./models/commodity/property_management'));
app.model(require('./models/commodity/commodity'));
app.model(require('./models/commodity/commodityadd'));
app.model(require('./models/commodity/commodityedit'));
app.model(require('./models/commodity/classified_goods'));
app.model(require('./models/commodity/commodity_message.js'));
app.model(require('./models/commodity/inventory'));
app.model(require('./models/commodity/inventoryadd'));
app.model(require('./models/refunds/after_sale'));
app.model(require('./models/system/system'));

app.model(require('./models/promotion/promotion'));
app.model(require('./models/promotion/promotionadd'));
app.model(require('./models/system/system_detail'));
app.model(require('./models/order/order'));

app.model(require('./models/user/user'));
app.model(require('./models/user/role'));
app.model(require('./models/user/privilege'));
app.model(require('./models/user/menu'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
