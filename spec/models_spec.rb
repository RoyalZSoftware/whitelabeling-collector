require_relative '../lib/whitelabeling_collector'
require 'json'

def setup_test
  if File.file? 'Test.sqlite3'
    File.delete 'Test.sqlite3'
  end
  WhitelabelingCollector::Lib.init(adapter: 'sqlite3', database: 'Test.sqlite3')
  require_relative '../lib/migrations/001_init.rb'
end

setup_test

creator = WhitelabelingCollector::Lib::User.create(name: "John Doe")
organization = WhitelabelingCollector::Lib::Organization.create(name: "Does Software")

invitation = organization.invite(creator, "invitee@acme.com")

invitation.accept

invitee = WhitelabelingCollector::Lib::User.create(name: "Invitee")

data_bucket = WhitelabelingCollector::Lib::DataBucket.create(organization_id: organization.id, created_by: creator, name: "IOS Onboarding", fields: [
  WhitelabelingCollector::Lib::Field.create(identifier: 'app_icon', name: "App icon", hint: "The icon that will be displayed in the app screen", description: "Xyz", validators: [
    WhitelabelingCollector::Lib::ImageSizeValidator.create(image_width: 512, image_height: 512)
  ]),
  WhitelabelingCollector::Lib::Field.create(identifier: 'name', name: "Name", hint: "The name of the app in the appstore", description: "xyz", validators: [
    WhitelabelingCollector::Lib::RegexValidator.create(regex: /[a-zA-Z]/)
  ]),
])

submission = WhitelabelingCollector::Lib::Submission.create(organization_id: organization.id, data_bucket_id: data_bucket.id)

submission.validate

p organization
p submission.data_bucket

p WhitelabelingCollector::Lib::Submission.first.organization
