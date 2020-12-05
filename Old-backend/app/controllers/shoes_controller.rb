class ShoesController < ApplicationController
    def index
        shoes = Shoe.all
        render json: shoes, except: [:created_at, :updated_at], include: [:shopping_carts, :comments]
    end

    def show
        shoe = Shoe.find_by(id: params[:id])
        if user
            render json: shoe.slice(:id, :name, :brand, :image_url)
        else
            render json: { message: 'Item not found' }
        end
        
    end
end
