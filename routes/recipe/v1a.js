const url  = require('url');
const json = require('../../utils/toJson');
const uniqueRecipeCount =  require('../../contollers/getUniqueRecipeNames');
const countPerRecipe =  require('../../contollers/getCountPerRecipe');
const listRecipeBySearchName = require('../../contollers/getListRecipeByName');
const busiestPostcode = require('../../contollers/getBusiestPostcode');
const data = require('../../data.json');
const router = require('express').Router();

//
// router.use(function (req,res, next){
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Content-disposition', 'attachment; filename= result.json');
//     console.log(req.url, Date.now());
//     next();
//
// })

router.post('/match_by_recipe_name',(req, res) => {
    // http://localhost:3002/recipe/match_by_recipe_name?search=Chicken&search=Potato
    const url_parts =  url.parse(req.url);
    const query = url_parts.query;
    const search_words =  [];
    query && query.split('&').forEach(value => search_words.push(value.split('=')[1]));
    if(search_words.length > 0){
        listRecipeBySearchName(data, search_words)
            .then(recipes => {
                res.statusCode = 200;
                return res.end(json({recipes}))
            })
            .catch(error => {
                res.status(400).send(error);
            });
    }else {
        res.status(204).send();
    }
});

router.get('/unique_recipe_count',(req, res) => {
    uniqueRecipeCount(data)
        .then(recipes => {
            res.writeHead(200);
            return res.end(json({recipes}))
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

router
    .route('/count_per_recipe')
    .get((req, res) => {
        countPerRecipe(data)
            .then(recipes => {
                res.writeHead(200);
                return res.end(json({recipes}))
            })
            .catch(error => {
                res.status(400).send(error);
            });
    });

router.get('/busiest_postcode', (req, res) => {
    busiestPostcode(data)
        .then(recipes => {
            res.writeHead(200);
            return res.end(json({recipes}))
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

module.exports = router;

