class AddDeadlineToTodos < ActiveRecord::Migration[7.1]
  def change
    add_column :todos, :deadline, :datetime
  end
end
