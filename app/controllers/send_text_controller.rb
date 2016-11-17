class SendTextController < ApplicationController
	def trigger_sms_message
	    account_sid = ENV["twilio_account_sid"]
	    auth_token = ENV["twilio_auth_token"]
	    twilio_phone = ENV["twilio_phone_number"]
	     
	    @client = Twilio::REST::Client.new account_sid, auth_token 

	     
	    @client.account.messages.create({
	      from: twilio_phone, 
	      to: "+1#{params[:to]}", 
	      body: "#{params[:body]}"
	    }) 
	end

	# def message_status
		
	# 	if params["MessageStatus"] == "sent"
	# 		flash[:info] = "SMS Sent Successfully"
	# 	end
	# end
end
