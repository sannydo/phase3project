class CreateShoes < ActiveRecord::Migration[6.0]
  def change
    create_table :shoes do |t|
      t.string :name
      t.string :brand
      t.string :image_url
      t.string :price

      t.timestamps
    end
  end
end
