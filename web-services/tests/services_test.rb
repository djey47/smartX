# services-test.rb

ENV['RACK_ENV'] = 'test'

require_relative '../rupees/services'
require 'rack/test'
require 'minitest/autorun'
require 'json'

class ServicesTest  < MiniTest::Test
  include Rack::Test::Methods

  # Required to provide tested application instance
  def app
    Services
  end

  # Runs before each test
  def setup
    @json_parser_opts = {:symbolize_names => true}
  end

  def test_heartbeat_should_return_http_200
    get '/'

    assert_equal(200, last_response.status)
  end

  def test_disks_should_return_http_200
    get '/disks.json'

    assert_equal(200, last_response.status)
  end

  def test_disks_should_return_proper_json
    get '/disks.json'

    parsed_object = JSON.parse(last_response.body, @json_parser_opts)
    assert(parsed_object[:last_received].is_a? String)
    assert(parsed_object[:disks].is_a? Array)
  end

  def test_smart_unknown_disk_should_return_http_404
    get '/smart.json/0'

    assert_equal(404, last_response.status)
  end

  def test_smart_should_return_http_200
    get '/smart.json/1'

    assert_equal(200, last_response.status)
  end

  def test_smart_should_return_proper_json
    get '/smart.json/1'

    parsed_object = JSON.parse(last_response.body, @json_parser_opts)
    assert(parsed_object[:items].is_a? Array)
  end
end