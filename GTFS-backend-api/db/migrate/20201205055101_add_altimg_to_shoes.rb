class AddAltimgToShoes < ActiveRecord::Migration[6.0]
  def change
    add_column :shoes, :alt_img, :string
  end
end
