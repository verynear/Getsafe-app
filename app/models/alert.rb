class Alert < ApplicationRecord
	validates :type_of_alert, :latitude, :longitude, presence: true
end
