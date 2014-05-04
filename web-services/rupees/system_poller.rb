# system_poller.rb - real implementation on linux shell commands. Acts as a wrapper, which can be overriden.

require 'logger'

class SystemPoller
  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::INFO
  end

  def get_devices
    cmd = 'hdparm /dev/sd? | grep "/dev/"'

    execute_command(cmd,'get_devices')
  end

  def get_model_numbers
    cmd = 'hdparm -I /dev/sd? | grep "Model Number:"'

    execute_command(cmd,'get_model_numbers')
  end

  def get_sizes_megabytes
    cmd = 'hdparm -I /dev/sd? | grep "1024:"'

    execute_command(cmd,'get_sizes_megabytes')
  end

  def get_temperature_celsius(device)
    cmd = "smartctl -A #{device} | grep \"Temperature_Celsius\""

    execute_command(cmd,'get_sizes_megabytes')
  end

  def execute_command(command, context)
    @logger.info("[SystemPoller][#{context}] Executing #{command}...")

    out = `#{command}`

    # Command failures
    if $?.to_i != 0
      @logger.error("[SystemPoller][#{context}] Command terminated abnormally: #{$?}")
      raise("Unable to get information: #{context} properly")
    end

    @logger.info("[SystemPoller][#{context}] Command ended. Output: #{out}")

    out
  end
end






