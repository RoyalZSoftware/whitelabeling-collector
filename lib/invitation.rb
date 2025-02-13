require 'active_record'
module WhitelabelingCollector
  module Lib

    class ProviderInvitation < ActiveRecord::Base
      ACCEPTED = 0
      ON_HOLD = 1
      DECLINED = 2
      validates_presence_of :organization, :state, :name, :created_by, :recipient_email
      attr_accessor :organization, :created_by, :recipient_email

      def accept
        @state = ACCEPTED
      end
    end
  end
end