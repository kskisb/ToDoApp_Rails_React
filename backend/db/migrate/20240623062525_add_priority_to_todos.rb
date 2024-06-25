class AddPriorityToTodos < ActiveRecord::Migration[7.1]
  def change
    add_column :todos, :priority, :string, default: 'Low'
  end
end
