class Shelter < ApplicationRecord
	def addstring
		"#{address}, #{city}, #{state}, #{zip}"
	end
end
