# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_02_172832) do

  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "shoe_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shoe_id"], name: "index_comments_on_shoe_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "shoes", force: :cascade do |t|
    t.string "name"
    t.string "brand"
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "shopping_cart_shoes", force: :cascade do |t|
    t.integer "shopping_cart_id", null: false
    t.integer "shoe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shoe_id"], name: "index_shopping_cart_shoes_on_shoe_id"
    t.index ["shopping_cart_id"], name: "index_shopping_cart_shoes_on_shopping_cart_id"
  end

  create_table "shopping_carts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_shopping_carts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password"
    t.integer "shoe_size"
    t.string "shoe_width"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "comments", "shoes"
  add_foreign_key "comments", "users"
  add_foreign_key "shopping_cart_shoes", "shoes"
  add_foreign_key "shopping_cart_shoes", "shopping_carts"
  add_foreign_key "shopping_carts", "users"
end
