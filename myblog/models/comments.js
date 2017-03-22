var marked = require('marked');
var Comment = require('../lib/mongo').Comment;

Comment.plugin('contentToHtml',{
	afterFind:function(comments){
		return comments.map(function (comment){
			comment.content = marked(comment.content);
			return comment;
		});
	}
});
module.exports = {
	create:function(comment){
		return Comment.create(comment).exec();
	},
	// 通过用户 id 和留言 id 删除一个留言
	delCommentById:function(commentId,author){
		return Comment.remove({author : author,_id :commentId}).exec();
	},
	//通过文章id删除该文章下的所有留言
	delCommentsByPostId:function(postId){
		return Comment.remove({postId : postId }).exec();
	},
	//通过文章id获取文章下的所有留言，按留言创建时间升序
	getComments:function(postId){
		return Comment
			.find({ postId : postId })
			.populate({ path : 'author', model : 'User'})
			.sort({ _id : 1})
			.addCreatedAt()
			.contentToHtml()
			.exec();
	},
	//通过文章id获取该文章下留言数
	getCommentsCount:function(postId){
		return Comment.count({ postId : postId }).exec();
	}
};