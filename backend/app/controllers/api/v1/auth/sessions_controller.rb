# module Api
#   module V1
#     module Auth
#       class SessionsController < ApplicationController
#       end
#     end
#   end
# end
class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end
end
