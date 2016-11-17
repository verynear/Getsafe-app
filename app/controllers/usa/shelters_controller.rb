class Usa::SheltersController < ApplicationController
	def index
		@shelters = Shelter.all
		sort_attribute = params[:sort]
		sort_order = params[:sort_order]
		search_term = params[:search_term]


		if search_term
			search_term = "%#{search_term}%"
			@shelters = @shelters.where("name ILIKE ?", search_term)
		end

		if sort_attribute && sort_order
		    @shelters = @shelters.order(sort_attribute => sort_order)
		elsif sort_attribute
		  	@shelters = @shelters.order(sort_attribute)
		end
	end

	def new
		
	end

	def create
		@shelter = Shelter.create(
					name: params[:name],
					address: params[:address],
					city: params[:city],
					state: params[:state],
					zip: params[:zip],
					active: params[:active],
					region: params[:region]
					)

		flash[:success] = "Shelter Listing Created"
		redirect_to "/shelters/#{@shelter.id}"
	end

	def show
		@shelter = Shelter.find(params[:id])
	end
		
	def edit
		@shelter = Shelter.find(params[:id])
	end

	def update
		@shelter = Shelter.find(params[:id])
		@shelter.update(
						name: params[:name],
						address: params[:address],
						city: params[:city],
						state: params[:state],
						zip: params[:zip],
						active: params[:active]
						)
		

		flash[:success] = "Shelter Listing Updated"
		redirect_to "/usa/shelters/#{@shelter.id}"
	end

	def destroy
		@shelter = Shelter.find(params[:id])
		@shelter.destroy

		flash[:warning] = "Shelter Listing Removed"
		redirect_to '/shelters'
	end
end
