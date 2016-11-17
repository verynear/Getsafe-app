class Api::SheltersController < ApplicationController
	def index
	  	@shelters = Shelter.where(region: "USA")
	  end

	  def show
	  	@shelter = Shelter.find(params[:id])
	  end
end
