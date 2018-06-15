angular
  .module("app")
  .controller("HomeController", function(
    $state,
    $anchorScroll,
    CommentService
  ) {
    var vm = this;
    vm.count = 0;
    vm.$service = CommentService;
    vm._$anchorScroll = $anchorScroll;
    vm.comments = [];
    vm.editComment = null;
    vm.form = document.querySelector("#comment-form");
    vm.editForm = document.querySelector("#edit-form");
    vm._$state = $state;
    vm.$onInit = function() {
      const [comments, count] = vm.$service.find();
      vm.comments = comments;
      vm.count = count;
    };
    vm.show = function() {
      console.log(vm.editComment);
      this.editComment = {};
      console.log(vm.editComment);
    };
    vm.create = function(comment) {
      this.$service.create(comment);
      const [comments, count] = this.$service.find();
      this.comments = comments;
      this.count = count;
      this._$state.go("home", {}, { reload: true });
    };
    vm.clickEdit = function(comment) {
      this.editComment = Object.assign({}, comment);
      this._$anchorScroll();
    };

    vm.update = function(comment, like) {
      this.$service.update(comment.id, comment, like);
      this._$state.go("home", {}, { reload: true });
    };

    vm.delete = function(comment) {
      this.$service.delete(comment.id);
      this._$state.go("home", {}, { reload: true });
    };
  })
  .controller("CommentFormCtrl", function($state) {
    var vm = this;
    vm.newComment = {};
    vm._$state = $state;

    vm.$onInit = function() {
      this.newComment = Object.assign({}, this.comment);
    };

    vm.$onChanges = function({ comment }) {
      this.newComment = Object.assign({}, comment.currentValue);
    };

    vm.cancel = function() {
      this._$state.go("home", {}, { reload: true });
    };

    vm.submitCreate = function() {
      this.onCreate({ comment: this.newComment });
    };
    vm.submitUpdate = function() {
      this.onUpdate({ comment: this.newComment });
    };

    vm.show = function() {
      this.editComment = {};
    };
  })
  .component("commentForm", {
    bindings: {
      comment: "<",
      onUpdate: "&",
      onCreate: "&",
      onDelete: "&",
      isEditing: "="
    },
    controller: "CommentFormCtrl",
    controllerAs: "$cctrl",
    templateUrl: "templates/comment-form.html"
  });
