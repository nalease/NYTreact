const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    const params = Object.assign(
      { api_key: "4dbad7cdd806474a9c178d72fddbf81c" },
      req.query
    );
      .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        params
      })
      .then(response => {
        db.Article.find()
          .then(dbArticles =>
            response.data.response.docs.filter(article =>
              dbArticles.every(
                dbArticle => dbArticle._id.toString()
              )
            )
          )
          .then(articles => res.json(articles))
          .catch(err => res.status(422).json(err));
      });
  }
};