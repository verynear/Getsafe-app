class UsersController < ApplicationController
	def new
		render 'new.html.erb'
	end

	def create
		user = User.new(
			name: params[:name],
			phone: params[:phone],
			email: params[:email],
			region: params[:region],
			password: params[:password],
			password_confirmation: params[:password_confirmation]
			)

		if user.save
			session[:user_id] = user.id
			flash[:success] = 'Successfully Created Account'
			redirect_to '/usa'
		else 
			flash[:warning] = 'Invalid email or password'
			redirect_to '/signup'
		end
	end

	def edit
		@user = current_user
	end

	def update
		@user = current_user
		@user.update(
					name: params[:name],
					phone: params[:phone],
					email: params[:email],
					region: params[:region],
					password: params[:password],
					password_confirmation: params[:password_confirmation]
					)
		

		flash[:success] = "Profile Updated"
		redirect_to "/usa"
	end

end
