# services.rb - REST http server

require 'sinatra/base'
require 'logger'

class Services < Sinatra::Base
  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::INFO
    #Required for correct Sinatra init
    super
  end

  #config
  set :port, 4600
  set :environment, :development
  set :show_exceptions, true

  #Heartbeat
  get '/' do
    @logger.info('[Services] Heartbeat!')
    [200, 'SmartX - webservices are alive :)']
  end
end