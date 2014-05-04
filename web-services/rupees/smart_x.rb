# smart_x.rb - app entry point

require 'singleton'
require 'logger'
require_relative 'services'

class SmartX
  include Singleton

  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::INFO
  end

  def run
    server_thread = Thread.new {
      @logger.info('[SmartX] Starting HTTP server...')
      Services.run!
    }
    @logger.info('[SmartX] Ready to rumble!')
    # Waiting for server thread to terminate
    server_thread.join
  end

  def stop
    @logger.info('[SmartX] Exiting SmartX.')
  end
end

# Boot
SmartX.instance.run
SmartX.instance.stop