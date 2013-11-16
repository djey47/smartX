# services.rb - REST http server

require 'sinatra/base'
require 'json'
require 'logger'
require_relative 'model/disk_list'
require_relative 'model/disk_details'
require_relative 'model/smart_details'
require_relative 'model/smart_item'
require_relative 'model/errors/unknown_disk_error'

class Services < Sinatra::Base

  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::INFO
    #Required for correct Sinatra init
    super
  end

  def get_disks
    @logger.info('[Services][disks]')

    # Fake data
    disk_list = DiskList.new
    disk_list.last_received = '1 year'
    disk_list.disks << DiskDetails.new(1, 'ST3000VN000', 2794.52, 25, 'OK', 'Good' )
    disk_list.disks << DiskDetails.new(2, 'ST2000DL003', 1863.02, 27, 'OK', 'Bad' )
    disk_list.disks << DiskDetails.new(3, 'ST2000DL003', 1863.02, 26, 'KO', 'Critical' )
  end

  def get_smart_details(disk_id)
    @logger.info("[Services][smart] disk_id=#{disk_id}")

    # Fake data
    raise UnknownDiskError if (disk_id > 3 || disk_id < 1)

    details = SmartDetails.new
    details.items << SmartItem.new(1, 'Read Error Rate', 15, 20, 50, 'OK', '0xF')
    details.items << SmartItem.new(2, 'Throughput Performance', 95, 95, 25, 'OK', '0x5F')
    details.items << SmartItem.new(3, 'Spin-Up Time', 10, 10, 5, 'KO', '0xA')
  end

  def handle_json_result(json, params)
    if params[:jsonp_callback]
      "#{params[:jsonp_callback]}(#{json})"
    else
      json
    end
  end

  #config
  set :port, 4600
  set :show_exceptions, true
  set :environment, :development

  #Heartbeat
  get '/' do
    @logger.info('[Services] Heartbeat!')
    [200, 'SmartX - webservices are alive :)']
  end

  #Returns list of disks
  get '/disks.json' do
    begin
      content_type :json
      [200, handle_json_result(get_disks.to_json, params)]
    rescue => exception
      @logger.error("[Services][disks] #{exception.inspect}")
      500
    end
  end

  #Returns SMART details for one disk
  get '/smart.json/:disk_id' do
    begin
      smart_info = get_smart_details(params[:disk_id].to_i)
      json = smart_info.to_json
      content_type :json
      [200, handle_json_result(json, params)]
    rescue UnknownDiskError => error
      @logger.error("[Services][smart] #{error.inspect}")
      404
    rescue => exception
      @logger.error("[Services][smart] #{exception.inspect}")
      500
    end
  end
end