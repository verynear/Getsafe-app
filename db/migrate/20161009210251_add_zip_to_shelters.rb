class AddZipToShelters < ActiveRecord::Migration[5.0]
  def change
  	add_column :shelters, :zip, :string
  end
end
