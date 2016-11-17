class RemoveUseridFromAlerts < ActiveRecord::Migration[5.0]
  def change
  	remove_column :alerts, :user_id, :string
  end
end
