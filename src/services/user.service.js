angular.module("app").factory("CommentService", function() {
  return {
    find: function() {
      const comments = JSON.parse(localStorage.getItem("comments")) || [];
      const count = comments.length;
      return [comments, count];
    },
    create: function(comment) {
      let comments = JSON.parse(localStorage.getItem("comments")) || [];
      comment = Object.assign(this.newComment(), comment);
      console.log(comment);
      comments.push(comment);
      localStorage.setItem("comments", JSON.stringify(comments));
      return comment;
    },

    delete: function(id) {
      let comments = JSON.parse(localStorage.getItem("comments"));
      let i = comments.findIndex(comment => comment.id === id);
      comments.splice(i, 1);
      localStorage.setItem("comments", JSON.stringify(comments));
    },

    update: function(id, comment, like) {
      let comments = JSON.parse(localStorage.getItem("comments"));
      let i = comments.findIndex(comment => comment.id === id);
      if (!like) {
        comments[i] = comment;
        console.log(like);
      } else {
        comments[i].likes++;
      }
      localStorage.setItem("comments", JSON.stringify(comments));
    },
    newComment: function() {
      const id = crypto.getRandomValues(new Uint32Array(1))[0];
      return Object.assign(
        {},
        {
          id,
          name: "",
          email: "",
          message: "",
          likes: 0,
          commentdate: Date.now()
        }
      );
    }
  };
});
