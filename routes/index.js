const router = require("express").Router();
[
    "/recipe/v1a"
].forEach(path => router.use(path, require(`.${path}`)));
module.exports = router;