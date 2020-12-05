class ShoppingCartsController < ApplicationController
    def index
        shopping_carts = ShoppingCart.all
        render json: shopping_carts, except: [:created_at, :updated_at], include: [:shoes]
    end

    def show
        shopping_cart = ShoppingCart.find_by(id: params[:id])
        if user
            render json: shoe.slice(:id, :name, :brand, :image_url)
        else
            render json: { message: 'Item not found' }
        end
    end
end
