Rails.application.routes.draw do
  get '/signup' => 'users#new'
  post '/users' => 'users#create'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'

  post '/send_sms' => 'send_text#trigger_sms_message'
  post '/sms_status' => 'send_text#message_status'
  
  namespace :usa do
    get '/' => 'alerts#index'
    get '/checkin' => 'alerts#checkin'
    get '/recent' => 'alerts#recent'

    get '/shelters' => 'shelters#index'
    get '/shelters/new' => 'shelters#new'
    post '/shelters' => 'shelters#create'

    get '/shelters/:id' => 'shelters#show'

    get '/shelters/:id/edit' => 'shelters#edit'
    patch '/shelters/:id' => 'shelters#update'

    delete '/shelters/:id' => 'shelters#destroy'
  end
  namespace :isr do
    get '/' => 'alerts#index'
    get '/checkin' => 'alerts#checkin'
    get '/recent' => 'alerts#recent'

    get '/shelters' => 'shelters#index'
    get '/shelters/new' => 'shelters#new'
    post '/shelters' => 'shelters#create'

    get '/shelters/:id' => 'shelters#show'

    get '/shelters/:id/edit' => 'shelters#edit'
    patch '/shelters/:id' => 'shelters#update'

    delete '/shelters/:id' => 'shelters#destroy'
  end

  namespace :api do
    get '/alerts' => 'alerts#index'
    get '/alerts/new' => 'alerts#new'
    post '/alerts' => 'alerts#create'

    get 'alerts/:id' => 'alerts#show'

    get '/shelters' => 'shelters#index'
    get '/shelters/:id' => 'shelters#show'
  end
end
