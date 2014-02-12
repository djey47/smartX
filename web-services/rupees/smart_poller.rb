# smart_poller.rb - utilities to gather system and SMART info

require_relative 'system_poller'
require_relative '../rupees/model/disk_list'

class SmartPoller

  # To inject different pollers (real and mock)
  @system_poller = SystemPoller.new
  attr_accessor :system_poller

  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::INFO
  end

  def get_disks
    disk_list = DiskList.new

    model_numbers = @system_poller.get_model_numbers
    sizes_megabytes = @system_poller.get_sizes_megabytes

    sizes_by_disk_ids = Hash.new
    disk_id = 0
    sizes_megabytes.split('\r\n').each do |line|
      raw_size = line.split(':')[1]

      if (not raw_size.nil?)
        disk_id = disk_id + 1
        raw_size = raw_size.split('MBytes')[0]
        @logger.debug( Float(raw_size.lstrip.rstrip) / 1024 )
        sizes_by_disk_ids.store(disk_id, Float(raw_size.lstrip.rstrip) / 1024 )
      end
    end

    models_by_disk_ids = Hash.new
    disk_id = 0
    model_numbers.split('\r\n').each do |line|
      raw_model_number = line.split('Number:')[1]

      if (not raw_model_number.nil?)
        disk_id = disk_id + 1
        raw_model_number = raw_model_number.lstrip.rstrip
        @logger.debug(raw_model_number)
        models_by_disk_ids.store(disk_id, raw_model_number)
      end
    end

    (1..disk_id).each { |id|
      disk_list.disks << DiskDetails.new(id=id, model=models_by_disk_ids[id], size_gigabytes=sizes_by_disk_ids[id])
    }

    disk_list
  end
end