class ChangeZipToNodefault < ActiveRecord::Migration[5.0]
  def change
  	remove_column :shelters, :zip, :string
  end
end
