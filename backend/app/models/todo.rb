class Todo < ApplicationRecord
  validates :title, presence: true
  validates :priority, inclusion: { in: %w(Low Medium High), message: "%{value} is not a valid priority" }
end
