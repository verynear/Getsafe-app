class CreateShelters < ActiveRecord::Migration[5.0]
  def change
    create_table :shelters do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.boolean :zip, :default => true

      t.timestamps
    end
  end
end
