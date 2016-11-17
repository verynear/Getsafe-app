class AddRegionToShelters < ActiveRecord::Migration[5.0]
  def change
  	add_column :shelters, :region, :string
  end
end
