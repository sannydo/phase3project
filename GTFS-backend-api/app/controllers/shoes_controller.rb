class ShoesController < ApplicationController
    def index
        shoes = Shoe.all
        render json: shoes, except: [:created_at, :updated_at], include: [:shopping_carts, :comments]
    end

    def show
        shoe = Shoe.find_by(id: params[:id])
        if shoe
            render json: shoe.slice(:id, :name, :brand, :image_url)
        else
            render json: { message: 'Item not found' }
        end
        
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
