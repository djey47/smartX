# system_poller.rb - real implementation

class SystemPoller
  def get_model_numbers
    # hdparm -I /dev/sd? | grep "Model Number:"

  end

  def get_sizes_megabytes
    # hdparm -I /dev/sd? | grep "1024:"

  end
end