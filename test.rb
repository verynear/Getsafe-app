require 'twilio-ruby'

get '/' do
    'Hello World! Currently running version ' + Twilio::VERSION + \
        ' of the twilio-ruby library.'
end