class UsersController < ApplicationController
    def index
        users = User.all
        users.each {|user| puts user.comments}
        render json: users, except: [:created_at, :updated_at], include: [:comments]
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user.slice(:id, :name, :username, :password, :shoe_size, :shoe_width, :comments)
        else
            render json: { message: 'Item not found' }
        end
    end

    # def new
    # end

    def create
        user = User.new(user_params)
        user.save
        # users = User.all
        render json: user#s, except: [:created_at, :updated_at], include: [:comments]
    end

    # def edit
    # end

    def update
        user = User.find(params[:id])
        user.update_attributes(user_params)
        render json: user
    end

    def destroy
        # @user = User.find_by(id: params[:id])
        # @user.destroy
        User.destroy(params[:id])
    end

    private

    def user_params
        params.require(:user).permit(:name, :username, :password, :shoe_size, :shoe_width)
    end
end
