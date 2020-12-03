class User < ApplicationRecord
    has_many :shopping_carts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :shoes, through: :comments
end
