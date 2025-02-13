require 'active_record'

module WhitelabelingCollector
  module Lib
    class DataBucket < ActiveRecord::Base
      belongs_to :organization
      attr_accessor :created_by, :fields, :name, :fields

      after_initialize :init

      def add_field(field)
        @fields << field
      end

      def init
        @fields ||= []
      end

      def validate(submitted_fields)
        fields.each do |field|
        end
      end
    end
  end
end
