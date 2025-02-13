require_relative '../lib/whitelabeling_collector'
require 'active_record'
require 'json'

def setup_test
  ActiveRecord::Base.establish_connection(adapter: 'sqlite3', database: 'Test.sqlite3')
  ActiveRecord::Migration.class_eval do 
    create_table :users do |t|
      t.string :name 
    end
    create_table :organizations do |t|
      t.string :name
    end
    create_table :provider_invitations do
    end
    create_table :fields
    create_table :validators
    create_table :data_buckets do |t|
      t.string :organization_id
    end
    create_table :submissions do |t|
      t.string :organization_id
      t.string :data_bucket_id
      t.string :user_id
    end
  end
end

setup_test

creator = WhitelabelingCollector::Lib::User.create(name: "John Doe")
organization = WhitelabelingCollector::Lib::Organization.create(name: "Does Software")

invitation = organization.invite(creator, "invitee@acme.com")

invitation.accept

invitee = WhitelabelingCollector::Lib::User.create(name: "Invitee")

data_bucket = WhitelabelingCollector::Lib::DataBucket.create(organization_id: organization.id, created_by: creator, name: "IOS Onboarding", fields: [
  WhitelabelingCollector::Lib::Field.create(identifier: 'app_icon', name: "App icon", hint: "The icon that will be displayed in the app screen", description: "Xyz"),
  WhitelabelingCollector::Lib::Field.create(identifier: 'name', name: "Name", hint: "The name of the app in the appstore", description: "xyz", validators: [
    WhitelabelingCollector::Lib::RegexValidator.create(regex: /[a-zA-Z]/)
  ]),
])

submission = WhitelabelingCollector::Lib::Submission.create(organization_id: organization.id, data_bucket_id: data_bucket.id)

submission.validate

p organization
p submission.data_bucket

p WhitelabelingCollector::Lib::Submission.first.organization