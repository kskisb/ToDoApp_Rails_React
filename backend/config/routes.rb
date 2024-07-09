Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  namespace :api do
    namespace :v1 do
      resources :todos, only: [:index, :show, :create, :update, :destroy]

      post "/graphql", to: "graphql#execute"
    end
  end
end
