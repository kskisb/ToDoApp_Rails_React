class Todo < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :priority, inclusion: { in: %w(Low Medium High), message: "%{value} is not a valid priority" }
end
