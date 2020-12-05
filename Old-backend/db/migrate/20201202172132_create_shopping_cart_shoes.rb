class CreateShoppingCartShoes < ActiveRecord::Migration[6.0]
  def change
    create_table :shopping_cart_shoes do |t|
      t.references :shopping_cart, null: false, foreign_key: true
      t.references :shoe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
