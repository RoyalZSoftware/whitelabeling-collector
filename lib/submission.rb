require 'active_record'

module WhitelabelingCollector
  module Lib
    class Submission < ActiveRecord::Base
      belongs_to :organization
      belongs_to :data_bucket
      belongs_to :submitter, :class_name => 'User', :foreign_key => 'id'
      has_many :fields
      
      def validate
        data_bucket.validate(fields)
      end
    end
  end
end