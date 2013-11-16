# smart_details.rb - represents collected SMART data for one disk.

require 'json'

class SmartDetails

  attr_accessor :items

  def initialize
    @items = []
  end

  def to_json(*a)
    {
        :items => @items
    }.to_json(*a)
  end
end