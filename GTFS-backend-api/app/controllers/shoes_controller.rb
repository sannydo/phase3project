class ShoesController < ApplicationController
    def index
        shoes = Shoe.all
        render json: shoes, except: [:created_at, :updated_at], include: [:shopping_carts, :comments]
    end

    def show
        shoe = Shoe.find_by(id: params[:id])
        if shoe
            render json: shoe, except: [:created_at, :updated_at], include: [:comments]
        else
            render json: { message: 'Item not found' }
        end
        
    end

    def shoes_price_index
        shoes = Shoe.all
        new_shoes =  shoes.sort_by { |shoe| shoe[:price].to_i }

        render json: new_shoes, except: [:created_at, :updated_at, :description], include: [:shopping_carts, :comments]
    end

    def update
        shoe = Shoe.find(params[:id])
        shoe.update_attributes(shoe_params)
        render json: shoe
    end

    private

    def shoe_params
        params.require(:shoe).permit(:name, :brand, :image_url, :stock, :description)
    end
end
