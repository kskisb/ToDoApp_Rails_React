# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, resolver: Resolvers::NodeResolver
    field :nodes, resolver: Resolvers::NodesResolver
    field :todo, resolver: Resolvers::TodoResolver
    field :todos, resolver: Resolvers::TodosResolver
    field :user, resolver: Resolvers::UserResolver
    field :users, resolver: Resolvers::UsersResolver
  end
end
