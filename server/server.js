const auth = require('json-server-auth');
const jsonServer = require('json-server');

// Create server
const server = jsonServer.create();

// Create router
const router = jsonServer.router('db.json');

// Middleware
const middleware = jsonServer.defaults();

const port = process.env.PORT || 9000;

// Bind the router db to the app
server.db = router.db;

server.use(middleware);

// Rules
const rules = auth.rewriter({
    users: 640,
    videos: 660,
    assignments: 660,
    quizzes: 660,
    assignmentMark: 660,
    quizMark: 660,
});

server.use(rules);
server.use(auth);
server.use(router);

// Start server
server.listen(port);
