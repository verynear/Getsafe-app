class Api::AlertsController < ApplicationController
	def index
	  	@alerts = Alert.all
	  end

	  def create
	  	@alert = Alert.create(
	  				time: params[:time],
	  				type_of_alert: params[:type_of_alert],
	  				latitude: params[:latitude],
	  				longitude: params[:longitude],
	  				)

	  	flash[:success] = "Alert Listing Created"
	  end

	  def show
	  	@alert = Alert.find(params[:id])
	  end

	  def recent
	  	@alerts = @alerts.order(created_at: :desc)	
	  end
end
