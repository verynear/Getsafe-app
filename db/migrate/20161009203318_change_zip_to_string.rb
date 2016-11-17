class ChangeZipToString < ActiveRecord::Migration[5.0]
  def change
  	change_column :shelters, :zip, :string
  end
end
