module Resolvers
  class NodesResolver < GraphQL::Schema::Resolver
    description "Fetches a list of objects given a list of IDs."
    type [Types::NodeType], null: true

    argument :ids, [ID], required: true

    def resolver(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end
  end
end
