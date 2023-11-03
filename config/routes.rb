Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
  get '/fetch_file', to: "home#fetch_pdf"
  post '/upload_file', to: 'home#upload_pdf'
  post '/chat', to: 'home#chat'
end
