# smart_details.rb - represents collected SMART data for one disk.

class SmartDetails

  attr_accessor :items

  def initialize
    @items = []
  end
end