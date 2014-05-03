# system_poller.rb - real implementation on linux shell commands. Acts as a wrapper, which can be overriden.

require 'logger'

class SystemPoller
  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::INFO
  end

  def get_devices
    cmd = 'hdparm /dev/sd? | grep "/dev/"'

    @logger.info("[SystemPoller][get_devices] Executing #{cmd}...")
    out = `#{cmd}`

    # Command failures
    if $?.to_i != 0
      @logger.error("[SystemPoller][get_devices] Command terminated abnormally: #{$?}")
      raise('Unable to get disk devices properly')
    end

    @logger.info("[SystemPoller][get_devices] Command ended. Output: #{out}")
    out
  end

  def get_model_numbers
    cmd = 'hdparm -I /dev/sd? | grep "Model Number:"'

    @logger.info("[SystemPoller][get_model_numbers] Executing #{cmd}...")
    out = `#{cmd}`

    # Command failures
    if $?.to_i != 0
      @logger.error("[SystemPoller][get_model_numbers] Command terminated abnormally: #{$?}")
      raise('Unable to get disk model numbers properly')
    end

    @logger.info("[SystemPoller][get_model_numbers] Command ended. Output: #{out}")
    out
  end

  def get_sizes_megabytes
    cmd = 'hdparm -I /dev/sd? | grep "1024:"'

    @logger.info("[SystemPoller][get_sizes_megabytes] Executing #{cmd}...")
    out = `#{cmd}`

    # Command failures
    if $?.to_i != 0
      @logger.error("[SystemPoller][get_sizes_megabytes] Command terminated abnormally: #{$?}")
      raise('Unable to get disk sizes properly')
    end

    @logger.info("[SystemPoller][get_sizes_megabytes] Command ended. Output: #{out}")
    out
  end

  def get_temperature_celsius(device)
    cmd = "smartctl -A #{device} | grep \"Temperature_Celsius\""

    @logger.info("[SystemPoller][get_temperature_celsius] Executing #{cmd}...")
    out = `#{cmd}`

    # Command failures
    if $?.to_i != 0
      @logger.error("[SystemPoller][get_temperature_celsius] Command terminated abnormally: #{$?}")
      raise('Unable to get disk temperatures properly')
    end

    @logger.info("[SystemPoller][get_temperature_celsius] Command ended. Output: #{out}")
    out
  end
end