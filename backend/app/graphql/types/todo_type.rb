# frozen_string_literal: true

module Types
  class TodoType < Types::BaseObject
    field :id, ID, null: false
    field :title, String
    field :completed, Boolean
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :priority, String
    field :deadline, GraphQL::Types::ISO8601DateTime
    field :user_id, Integer
    field :user, UserType, null: false

    def user
      Loaders::RecordLoader.for(User).load(object.user_id)
    end
  end
end
