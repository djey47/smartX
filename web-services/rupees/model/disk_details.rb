# disk_details.rb - represents basic information about one disk.

class DiskDetails

  attr_reader :id
  attr_reader :model
  attr_reader :size
  attr_reader :temperature_celsius
  attr_reader :smart_status
  attr_reader :smartx_status

  def initialize(id = -1, model = 'N/A', size = -1, temperature_celsius = -1, smart_status = 'N/A', smartx_status = 'N/A')
    @id = id
    @model = model
    @size = size
    @temperature_celsius = temperature_celsius
    @smart_status = smart_status
    @smartx_status = smartx_status
  end
end