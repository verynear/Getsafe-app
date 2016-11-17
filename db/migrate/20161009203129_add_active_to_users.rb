class AddActiveToUsers < ActiveRecord::Migration[5.0]
  def change
  	add_column :shelters, :active, :boolean, default: true
  end
end
