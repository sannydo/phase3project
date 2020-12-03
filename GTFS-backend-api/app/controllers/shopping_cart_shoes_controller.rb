class ShoppingCartShoesController < ApplicationController
    def index
        shopping_cart_shoes = ShoppingCartShoe.all
        render json: shopping_cart_shoes, except: [:created_at, :updated_at]
    end

    def show
        shopping_cart_shoe = ShoppingCartShoe.find_by(id: params[:id])
        if user
            render json: shoe.slice(:id, :name, :brand, :image_url)
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        shopping_cart_shoe = ShoppingCartShoe.new(shopping_cart_shoe_params)
        shopping_cart_shoe.save
        render json: shopping_cart_shoe
    end

    # def edit
    # end

    def update
        shopping_cart_shoe = ShoppingCartShoe.find_by(params[:id])
        shopping_cart_shoe.update_attributes(shopping_cart_shoe_params)
        render json: shopping_cart_shoe
    end

    def destroy
        ShoppingCartShoe.destroy(params[:id])
    end

    private

    def shopping_cart_shoe_params
        params.require(:shopping_cart_shoe).permit(:id, :name, :brand, :image_url)
    end
end
