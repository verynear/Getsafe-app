class Isr::AlertsController < ApplicationController

	def index
		sample_alerts = [{alert_start: '2013/04/14 14:36', alert_end: '2014/04/14 14:38', alert_type: "Imminent", alert_zone: "Chicago"}, {alert_start: '2015/06/17 16:39', alert_end: '2015/06/17 16:47', alert_type: "Imminent", alert_zone: "Jerusalem"}, {alert_start: '2016/02/06 09:19', alert_end: '2016/02/06 09:28', alert_type: "Elevated", alert_zone: "New York"}]
		alert_index = rand(1..3) - 1
		@alert = sample_alerts[alert_index]
	end

	def checkin
		
	end

	def recent
		@alerts = @alerts.order(created_at: :desc)
	end
end
