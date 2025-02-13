require 'active_record'

module WhitelabelingCollector
  module Lib
    class Field < ActiveRecord::Base
      attr_accessor :identifier, :name, :hint, :description, :validators
    end
  end
end