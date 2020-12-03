class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :password
      t.integer :shoe_size
      t.string :shoe_width

      t.timestamps
    end
  end
end
