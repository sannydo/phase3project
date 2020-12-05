class ShoppingCart < ApplicationRecord
    belongs_to :user
    has_many :shopping_cart_shoes
    has_many :shoes, through: :shopping_cart_shoes
end
