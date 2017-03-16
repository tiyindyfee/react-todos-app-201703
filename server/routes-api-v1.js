// Define a Node module that handles routing
module.exports.setup = (router, uploads, knex) => {
    // 1. Load libraries
    let moment = require('moment')
    let now = moment().format('YYYY-MM-DD HH:mm:ss')

    // 2. Define routes
    // Get all todos
    router.get('/todos', function(request, response) {
        knex.select('*').table('todos').orderBy('category', 'asc').orderBy('id', 'asc').then(function(data) {
            response.json(data)
        })
    })

    // Post a new todo
    router.post('/todos', function(request, response) {
        let todo = {
            todo: request.body.todo.trim(),
            completed: request.body.completed ? 'yes' : 'no',
            // due_at: moment(request.body.due_at.trim()).format('YYYY-MM-DD'),
            category: request.body.category,
            created_at: now,
            updated_at: now,
        }

        knex.insert(todo).table('todos').returning('*').then(function(data) {
            response.json(data[0])
        })

    })

    // Mark todo as complete
    router.get('/todos/:todoId/complete', function(request, response) {
        let todo = {
            completed: 'yes',
            updated_at: now
        }

        knex.update(todo).table('todos').where('id', '=', request.params.todoId).then(function(data) {
            response.json(true)
        })
    })

    // Mark todo as incomplete
    router.get('/todos/:todoId/incomplete', function(request, response) {
        let todo = {
            completed: 'no',
            updated_at: now
        }

        knex.update(todo).table('todos').where('id', '=', request.params.todoId).then(function(data) {
            response.json(true)
        })
    })

    // Return the router, with new routes attached back to the Express web server that's loading these
    return router
}