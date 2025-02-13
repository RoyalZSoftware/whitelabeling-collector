module WhitelabelingCollector
  module Lib
    require_relative './user.rb'
    require_relative './organization.rb'
    require_relative './validator.rb'
    require_relative './field.rb'
    require_relative './data_bucket.rb'
    require_relative './submission.rb'

    def self.init(config)
      ActiveRecord::Base.establish_connection(config)
    end
  end
end
