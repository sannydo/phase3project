class Shoe < ApplicationRecord
    has_many :shopping_cart_shoes
    has_many :shopping_carts, through: :shopping_cart_shoes
    has_many :comments, dependent: :destroy
    has_many :users, through: :comments
end
