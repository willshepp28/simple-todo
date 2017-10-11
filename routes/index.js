const router = require('express').Router(),
    models = require('../models');




router
    .route('/')
    .get( async (request, response) => {
        
        var todo = await models.Todo.findAll()
            .then(todos => {
                

                var complete = todos.filter(function(x){
                    return x.isComplete === true;
                });

                var inComplete = todos.filter(function(x){
                    return x.isComplete === false;
                });

                console.log(complete);
                console.log(inComplete);

                response.render('home', {complete, inComplete});
            })
            .catch(err => {
                console.log(err);
                response.redirect('/');
            })
    });



router  
    .route('/todo')
    .post( async(request , response) => {
        
        var todo = await models.Todo.create({ description: request.body.description , isComplete: false })
            .then(x => {
                console.log(x);
                response.redirect('/');
            })
            .catch(err => {
                console.log(err);
                response.redirect('/');
            })
    })


    router.get('/todo/:id', async(request, response) => {

        var todo = await models.Todo.update({ isComplete: true }, { where: { id: request.params.id }})
            .then(x => {
                console.log('you marked this todo as complete');
                response.redirect('/');
            })
            .catch(err => {
                console.log(err);
                response.redirect('/');
            });
    })


module.exports = router;