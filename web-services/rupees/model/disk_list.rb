# disk_list.rb - represents list of disks to return through ws

class DiskList

  attr_accessor :last_received
  attr_reader :disks

  def initialize
    @last_received = ''
    @disks = []

  end
end