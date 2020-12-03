Rails.application.routes.draw do
  resources :comments
  resources :shopping_cart_shoes
  resources :shopping_carts
  resources :shoes
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
