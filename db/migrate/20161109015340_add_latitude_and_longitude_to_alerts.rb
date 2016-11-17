class AddLatitudeAndLongitudeToAlerts < ActiveRecord::Migration[5.0]
  def change
    add_column :alerts, :latitude, :float
    add_column :alerts, :longitude, :float
  end
end
