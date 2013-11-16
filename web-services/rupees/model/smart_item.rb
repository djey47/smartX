# smart-item.rb - Represents 1 SMART info item.

require 'json'

class SmartItem

  attr_reader :id
  attr_reader :label
  attr_reader :raw_data
  attr_reader :status
  attr_reader :threshold
  attr_reader :value
  attr_reader :worst

  def initialize(id=-1, label='N/A', value=-1, worst=-1, threshold=-1, status='N/A', raw_data='N/A')
    @id = id
    @label = label
    @value = value
    @worst = worst
    @threshold = threshold
    @status = status
    @raw_data = raw_data
  end

  def to_json(*a)
    {
        :id => @id,
        :worst => @worst,
        :value => @value,
        :threshold => @threshold,
        :label => @label,
        :raw_data => @raw_data,
        :status => @status
    }.to_json(*a)
  end
end