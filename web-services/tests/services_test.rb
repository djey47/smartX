# services-test.rb

ENV['RACK_ENV'] = 'test'

require_relative '../rupees/services'
require 'rack/test'
require 'test/unit'
require 'json'

class ServicesTest  < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    Services
  end

  def test_disks_should_return_http_200
    get '/disks.json'

    opts = {:symbolize_names => true}
    parsed_object = JSON.parse(last_response.body, opts)
    assert_true(parsed_object[:last_received].is_a? String)
    assert_true(parsed_object[:disks].is_a? Array)
    assert_equal(200, last_response.status)
  end

  def test_smart_unknown_disk_should_return_http_404
    get '/smart.json/0'

    assert_equal(404, last_response.status)
  end
end