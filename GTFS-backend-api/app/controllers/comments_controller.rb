class CommentsController < ApplicationController
    def index
        comments = Comment.all
        render json: comments, except: [:created_at, :updated_at], include: [:user, :shoe]
    end

    def show
        comment = Comment.find_by(id: params[:id])
        if user
            render json: comment.slice(:id, :content, :user_id, :shoe_id)
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        comment = Comment.new(comment_params)
        comment.save
        render json: comment
    end

    # def edit
    # end

    def update
        comment = Comment.find_by(params[:id])
        comment.update_attributes(comment_params)
        render json: comment
    end

    def destroy
        Comment.destroy(params[:id])
    end

    private

    def comment_params
        params.require(:comment).permit(:id, :content, :user_id, :shoe_id)
    end
end
