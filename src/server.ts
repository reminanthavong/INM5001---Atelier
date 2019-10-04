import * as express from "express";
import log from "./log";

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))

app.listen(process.env.PORT || 5000, () => {
    log.info("app running");
});
