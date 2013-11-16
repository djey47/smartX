# services.rb - web server

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

end