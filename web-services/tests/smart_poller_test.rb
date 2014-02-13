require_relative '../rupees/model/disk_list'
require_relative '../rupees/smart_poller'
require 'minitest/autorun'

class SmartPollerTest < MiniTest::Test

  def setup
    @smart_poller = SmartPoller.new(SystemPollerMock.new)
  end

  def teardown
    # Do nothing
  end

  def test_get_disks_returns_disk_list
    disk_list = @smart_poller.get_disks

    assert(disk_list.disks.length == 4)
    assert(disk_list.disks[0].model == 'ST3000VN000-1H4167' )
    assert(disk_list.disks[0].size_gigabytes == 2794.5195 )
    assert(disk_list.disks[3].model == 'ST2000DL003-9VT166' )
    assert(disk_list.disks[3].size_gigabytes == 1863.0166 )
  end

  # Used for testing
  class SystemPollerMock
    def get_model_numbers
      '\tModel Number:       ST3000VN000-1H4167                      \n\tModel Number:       ST3000VN000-1H4167                      \n\tModel Number:       ST2000DL003-9VT166                      \n\tModel Number:       ST2000DL003-9VT166                      \n'
    end

    def get_sizes_megabytes
      '\tdevice size with M = 1024*1024:     2861588 MBytes\n\tdevice size with M = 1024*1024:     2861588 MBytes\n\tdevice size with M = 1024*1024:     1907729 MBytes\n\tdevice size with M = 1024*1024:     1907729 MBytes\n'
    end
  end
end