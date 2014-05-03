# smart_poller.rb - utilities to gather system and SMART info

require_relative 'system_poller'
require_relative '../rupees/model/disk_details'
require_relative '../rupees/model/disk_list'

class SmartPoller

  # To inject different pollers (real and mock)
  def initialize(system_poller = SystemPoller.new)
    @system_poller = system_poller
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::DEBUG
  end

  def get_disks
    disk_list = DiskList.new

    # Extracts devices
    devices = @system_poller.get_devices
    devices_by_disk_ids = Hash.new
    disk_id = 0
    devices.split("\n").each do |line|
      raw_device = line.split(':')[0]

      unless raw_device.nil?
        disk_id = disk_id + 1
        @logger.debug(raw_device)
        devices_by_disk_ids.store(disk_id, raw_device)
      end
    end

    # Extracts sizes
    sizes_megabytes = @system_poller.get_sizes_megabytes
    sizes_by_disk_ids = Hash.new
    disk_id = 0
    sizes_megabytes.split("\n").each do |line|
      raw_size = line.split(':')[1]

      unless raw_size.nil?
        disk_id = disk_id + 1
        raw_size = raw_size.split('MBytes')[0]
        raw_size = (Float(raw_size.lstrip.rstrip) / 1024).round(4)
        @logger.debug(raw_size)
        sizes_by_disk_ids.store(disk_id, raw_size)
      end
    end

    # Extracts model numbers
    model_numbers = @system_poller.get_model_numbers
    models_by_disk_ids = Hash.new
    disk_id = 0
    model_numbers.split("\n").each do |line|
      raw_model_number = line.split(':')[1]

      unless raw_model_number.nil?
        disk_id = disk_id + 1
        raw_model_number = raw_model_number.lstrip.rstrip
        @logger.debug(raw_model_number)
        models_by_disk_ids.store(disk_id, raw_model_number)
      end
    end

    # Extracts temperatures
    temperatures_by_disk_ids = Hash.new
    disk_id = 0
    devices_by_disk_ids.values.each do |device|
      disk_id = disk_id + 1
      temperature_celisus = @system_poller.get_temperature_celsius(device)
      # @logger.debug( temperature_celisus )
      raw_temperature = temperature_celisus.split(' ')[3]
      raw_temperature = Integer(raw_temperature, 10)
      @logger.debug( raw_temperature )
      temperatures_by_disk_ids.store(disk_id, raw_temperature)
    end

    # Populates diks list
    (1..disk_id).each { |id|
      disk_list.disks << DiskDetails.new(id = id,
                                         model = models_by_disk_ids[id],
                                         size_gigabytes = sizes_by_disk_ids[id],
                                         device = devices_by_disk_ids[id],
                                         temperature_celisus = temperatures_by_disk_ids[id],)
    }
    disk_list
  end
end