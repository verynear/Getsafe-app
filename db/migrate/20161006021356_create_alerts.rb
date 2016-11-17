class CreateAlerts < ActiveRecord::Migration[5.0]
  def change
    create_table :alerts do |t|
      t.string :time
      t.string :type_of_alert
      t.string :user_id

      t.timestamps
    end
  end
end
