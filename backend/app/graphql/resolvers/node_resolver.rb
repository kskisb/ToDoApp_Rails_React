module Resolvers
  class NodeResolver < GraphQL::Schema::Resolver
    description "Fetches an object given its ID."
    type Types::NodeType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      context.schema.object_from_id(id, context)
    end
  end
end
