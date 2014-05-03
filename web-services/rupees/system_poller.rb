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
    # hdparm -I /dev/sd? | grep "Model Number:"

  end

  def get_sizes_megabytes
    # hdparm -I /dev/sd? | grep "1024:"

  end

  def get_temperature_celsius(device)
    # smartctl -A | grep "Temperature_Celsius"

  end
end