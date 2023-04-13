// Express middleware - local 開発用リクエスト変更先を記述する
module.exports = function middleware(app) {
  // example - 1
  app.get('/api/v1/:method', (request, response) => {
    console.log('express.get - /api/v1/:method', request.params.method);

    response.json({
      response: {
        // slug: request.params.slug,
        method: request.params.method,
      },
    });
  });

  // example - 2
  app.get('/api/v1/articles/category/:slug', (request, response) => {
    console.log('express.get - /api/v1/articles/category/:slug', request.params.slug);

    response.json({
      response: {
        slug: request.params.slug,
        // method: request.params.method,
      },
    });
  });

  // example - 3
  app.get('/api/v1/articles/:method/:slug', (request, response) => {
    console.log(
      'express.get - /api/v1/articles/:method',
      request.params.method,
      request.params.slug
    );

    response.json({
      response: {
        slug: request.params.slug,
        method: request.params.method,
      },
    });
  });
};
