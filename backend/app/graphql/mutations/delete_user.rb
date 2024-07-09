# frozen_string_literal: true

module Mutations
  class DeleteUser < BaseMutation
    field :id, ID, null: false

    argument :id, ID, required: true

    def resolve(id:)
      user = User.find(id)
      user.destroy
      {
        id: id
      }
    end
  end
end
