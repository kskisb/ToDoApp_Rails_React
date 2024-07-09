# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :email, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :todos, [TodoType], null: true

    def todos
      Loaders::AssociationLoader.for(User, :todos).load(object)
    end
  end
end
