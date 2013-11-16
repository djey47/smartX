# disk_list.rb - represents list of disks to return through ws

require 'json'

class DiskList

  attr_accessor :last_received
  attr_reader :disks

  def initialize
    @last_received = ''
    @disks = []
  end

  def to_json(*a)
    {
        :last_received => @last_received,
        :disks => @disks
    }.to_json(*a)
  end
end