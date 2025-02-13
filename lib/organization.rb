require 'active_record'
require_relative './invitation'

module WhitelabelingCollector::Lib
  class Organization < ActiveRecord::Base
    has_many :invitations

    def members
      @invitations
    end

    def invite(sender, recipient_email)
      inv = WhitelabelingCollector::Lib::ProviderInvitation.new(organization: self, created_by: sender, recipient_email: recipient_email)
      @invitations ||= []
      @invitations << inv

      return inv
    end
  end
end