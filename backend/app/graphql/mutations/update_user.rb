# frozen_string_literal: true

module Mutations
  class UpdateUser < BaseMutation
    field :user, Types::UserType, null: false

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :email, String, required: false

    def resolve(id:, **args)
      user = User.find(id)
      user.update!(args)
      {
        user: user
      }
    end
  end
end
