require_relative '../rupees/model/disk_list'
require_relative '../rupees/smart_poller'
require 'minitest/autorun'

class SmartPollerTest < MiniTest::Test

  def setup
    @smart_poller = SmartPoller.new
    @smart_poller.system_poller = SystemPollerMock.new
  end

  def teardown
    # Do nothing
  end

  def test_get_disks_returns_disk_list
    disk_list = @smart_poller.get_disks

    assert(disk_list.is_a? DiskList)
    assert(disk_list.disks.length == 4)
    assert(disk_list.disks[0].model == 'ST3000VN000-1H4167' )
    assert(disk_list.disks[0].size_gigabytes == 2794.51953125 )

  end

  # Used for testing
  class SystemPollerMock
    def get_model_numbers
      '        Model Number:       ST3000VN000-1H4167\r\n        Model Number:       ST3000VN000-1H4167\r\n        Model Number:       ST2000DL003-9VT166\r\n        Model Number:       ST2000DL003-9VT166'
    end

    def get_sizes_megabytes
      '         device size with M = 1024*1024:     2861588 MBytes\r\n        device size with M = 1024*1024:     2861588 MBytes\r\n        device size with M = 1024*1024:     1907729 MBytes\r\n        device size with M = 1024*1024:     1907729 MBytes'
    end
  end
end